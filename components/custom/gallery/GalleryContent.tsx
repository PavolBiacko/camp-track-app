import GalleryImageLine from '@/components/custom/gallery/base/GalleryImageLine';
import Loading from '@/components/custom/Loading';
import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors';
import { useGalleryImagesPaginated } from '@/hooks/models/useImages';
import { groupImagesIntoRows } from '@/utils/gallery';
import { useColorScheme } from 'nativewind';
import { ActivityIndicator, FlatList } from 'react-native';

const GalleryContent = () => {
  const { colorScheme } = useColorScheme();

  const { images, isLoading, isError, fetchNextPage, hasNextPage } = useGalleryImagesPaginated();

  if (!images || isLoading || isError) {
    return <Loading showText={false} />;
  }

  // Flatten the paginated images into a single array, grouped by rows
  const allImages = images.pages.flatMap(page => page);
  const groupedImages = groupImagesIntoRows(allImages);

  return (
    <FlatList
      data={groupedImages}
      renderItem={({ item, index }) => (
        <GalleryImageLine
          key={index}
          item={item}
        />
      )}
      keyExtractor={(index) => `row-${index}`}
      className="w-full h-full px-3 my-1"
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      initialNumToRender={5}
      windowSize={3}
      maintainVisibleContentPosition={{ minIndexForVisible: 0, autoscrollToTopThreshold: 0 }}
      ListFooterComponent={
        hasNextPage ? (
          <ActivityIndicator size="large" color={getRGBColor("primary", "500", colorScheme)} />
        ) : null
      }
    />
  )
}

export default GalleryContent