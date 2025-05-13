import CustomButton from '@/components/custom/CustomButton'
import { router } from 'expo-router'
import { View } from 'react-native'

const ChildrenFooter = () => {
  return (
    <View className='h-[12.5%] justify-center items-center'>
      <CustomButton
        title="Pridaj nové dieťa"
        action="primary"
        variant="combined"
        handlePress={() => router.push('/(main)/(camp)/children/create-child')}
        textStyles='text-xl font-pbold self-center'
        containerStyles="w-2/3 h-16 rounded-3xl"
      />
    </View>
  )
}

export default ChildrenFooter