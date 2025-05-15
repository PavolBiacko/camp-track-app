import CustomButton from '@/components/custom/CustomButton';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { useState } from 'react';
import { Image, View } from 'react-native';

const ImagePickerButton = () => {
  const [image, setImage] = useState<string | null>(null);

  const handlePickImages = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      allowsMultipleSelection: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      setImage(null);
    }
  };

  return (
    <View className='w-full items-center'>
      <CustomButton
        title="Pridaj fotky"
        handlePress={handlePickImages}
        textStyles="text-2xl"
        containerStyles="w-2/3 h-16 rounded-3xl"
      />
      {image && <Image source={{ uri: image }} />}
    </View>
  );
}

export default ImagePickerButton;
