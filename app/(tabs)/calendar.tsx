import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Calendar = () => {
  return (
    <SafeAreaView className='bg-background-0 w-full h-full'>
      <Text className='text-typography-950'>Calendar</Text>
    </SafeAreaView>
  )
}

export default Calendar