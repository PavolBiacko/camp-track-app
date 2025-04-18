import { ChildAccountParams } from '@/types/finance'
import { useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

const ChildAccount = () => {
  const { childId } = useLocalSearchParams<ChildAccountParams>()

  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-typography-950 font-pblack'>Child with ID: {childId}</Text>
    </View>
  )
}

export default ChildAccount