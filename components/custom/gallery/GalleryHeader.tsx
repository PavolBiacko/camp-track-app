import { useAuth } from '@/hooks/useAuth';
import { UserRoles } from '@/types/enums/roles';
import { Text, View } from 'react-native';
import ImagePickerExample from '../CustomImagePicker';

const GalleryHeader = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // should not happen, since useAuth is used in the layout layer
  }

  return (
    <View>
      <View className='justify-center items-center bg-background-300 border-y border-outline-500 py-2'>
        <Text className='text-typography-950 text-2xl text-center font-pbold'>
          Fotostena
        </Text>
      </View>
      {user.role === UserRoles.CAMP_LEADER && (
        <View className="h-24 justify-center items-center border-b border-outline-500">
          <ImagePickerExample />
        </View>
      )}
    </View>
  )
}

export default GalleryHeader