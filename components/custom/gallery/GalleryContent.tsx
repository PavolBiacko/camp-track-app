import { useGalleryContext } from '@/components/custom/context/GalleryContext';
import CustomModal from '@/components/custom/CustomModal';
import EmptyScreenMessage from '@/components/custom/EmptyScreenMessage';
import GalleryImageLine from '@/components/custom/gallery/base/GalleryImageLine';
import Loading from '@/components/custom/Loading';
import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors';
import { useGalleryImagesPaginated } from '@/hooks/models/useImages';
import { groupImagesIntoRows } from '@/utils/gallery';
import { useColorScheme } from 'nativewind';
import { ActivityIndicator, FlatList } from 'react-native';

const GalleryContent = () => {
  const { colorScheme } = useColorScheme();
  const { photosUpdating, setPhotosUpdating } = useGalleryContext();

  const { images, isLoading, isError, fetchNextPage, hasNextPage } = useGalleryImagesPaginated();

  if (!images || isLoading || isError) {
    return <Loading showText={false} />;
  }

  // Flatten the paginated images into a single array, grouped by rows
  const allImages = images.pages.flatMap(page => page);
  const groupedImages = groupImagesIntoRows(allImages);

  return (
    <>
      {(images.pages.length === 1 && images.pages[0].length === 0)
        ? (
          <EmptyScreenMessage text="Neexistujú žiadne fotky." />
        ) : (
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
            maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
            ListFooterComponent={
              hasNextPage ? (
                <ActivityIndicator size="large" color={getRGBColor("primary", "500", colorScheme)} />
              ) : null
            }
          />
        )}
      <CustomModal
        type="loading"
        modalVisible={photosUpdating}
        setModalVisible={setPhotosUpdating}
        containerStyles='w-20 h-20'
      />
    </>
  )
}

export default GalleryContent