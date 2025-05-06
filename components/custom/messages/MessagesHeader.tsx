import { Text, View } from 'react-native'
import MessagesBox from './base/MessagesBox'

const MessagesHeader = () => {
  return (
    <View className='h-[28%]'>
      <View className='flex-row justify-center items-center bg-background-300 border-y border-outline-500 gap-5 py-2'>
        <Text className='text-typography-950 text-2xl text-center font-pbold'>
          Prebiehajúci turnus
        </Text>
      </View>
      <View className='flex-1 justify-center items-center'>
        <MessagesBox groupName='(3.7.2025 - 12.7.2025)' />
      </View>
    </View>
  )
}

export default MessagesHeader