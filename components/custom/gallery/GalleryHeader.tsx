import { useGalleryContext } from '@/components/custom/context/GalleryContext';
import CustomButton from '@/components/custom/CustomButton';
import { useAddManyImages } from '@/hooks/models/useImages';
import { useAuth } from '@/hooks/useAuth';
import { UserRoles } from '@/types/enums/roles';
import { processImagesForUpload } from '@/utils/gallery';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { Text, View } from 'react-native';

const GalleryHeader = () => {
  const { user } = useAuth();
  const { setPhotosUpdating } = useGalleryContext();
  const { addManyImages } = useAddManyImages();

  if (!user) {
    return null; // should not happen, since useAuth is used in the layout layer
  }

  const handlePickImages = async () => {
    setPhotosUpdating(true);

    let result = await launchImageLibraryAsync({
      base64: true,
      mediaTypes: ['images'],
      allowsEditing: false,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (result.canceled) {
      setPhotosUpdating(false);
      return;
    }

    const imagesToUpload = processImagesForUpload(result.assets);

    if (imagesToUpload.length > 0) {
      await addManyImages(imagesToUpload);
    }

    setPhotosUpdating(false);
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
            handlePress={handlePickImages}
            textStyles="text-2xl"
            containerStyles="w-2/3 h-16 rounded-3xl"
          />
        </View>
      )}
    </View>
  )
}

export default GalleryHeader