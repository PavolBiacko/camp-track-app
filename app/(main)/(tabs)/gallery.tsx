import GalleryContent from '@/components/custom/gallery/GalleryContent';
import GalleryHeader from '@/components/custom/gallery/GalleryHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const Gallery = () => {
  return (
    <SafeAreaView className='justify-center h-full'>
      <GalleryHeader />
      <GalleryContent />
    </SafeAreaView>
  )
}

export default Gallery