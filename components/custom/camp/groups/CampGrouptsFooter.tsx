import CustomButton from '@/components/custom/CustomButton';
import { router } from 'expo-router';
import { View } from 'react-native';

const CampGroupsFooter = () => {
  return (
    <View className='h-[12.5%] border-t border-outline-500 justify-center items-center'>
      <CustomButton
        title="Pridaj nový oddiel"
        action="primary"
        variant="combined"
        handlePress={() => router.push('/(main)/(camp)/groups/create-group')}
        textStyles='text-xl font-pbold self-center'
        containerStyles="w-2/3 h-16 rounded-3xl"
      />
    </View>
  )
}

export default CampGroupsFooter