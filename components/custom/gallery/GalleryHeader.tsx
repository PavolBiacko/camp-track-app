import { useGalleryContext } from '@/components/custom/context/GalleryContext';
import CustomButton from '@/components/custom/CustomButton';
import { useAuth } from '@/hooks/useAuth';
import { galleryRepository } from '@/repositories/galleryRepository';
import { UserRoles } from '@/types/enums/roles';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { Text, View } from 'react-native';

const GalleryHeader = () => {
  const { user } = useAuth();
  const { setPhotos } = useGalleryContext();

  if (!user) {
    return null; // should not happen, since useAuth is used in the layout layer
  }

  const getPictures = async () => {
    const photos = await galleryRepository.getPaginatedImages(1);
    setPhotos(photos);
    console.log('photos', JSON.stringify(photos, null, 2));
  };

  const handlePickImages = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      allowsMultipleSelection: true,
      quality: 1,
    });
  };

  return (
    <View>
      <View className='justify-center items-center bg-background-300 border-y border-outline-500 py-2'>
        <Text className='text-typography-950 text-2xl text-center font-pbold'>
          Fotostena
        </Text>
      </View>
      {user.role === UserRoles.CAMP_LEADER && (
        <View className="h-24 justify-center items-center border-b border-outline-500">
          <CustomButton
            title="Pridaj fotky"
            handlePress={getPictures}
            textStyles="text-2xl"
            containerStyles="w-2/3 h-16 rounded-3xl"
          />
        </View>
      )}
    </View>
  )
}

export default GalleryHeader