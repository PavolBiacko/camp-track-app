import ScheduleContent from '@/components/custom/schedule/ScheduleContent'
import ScheduleHeader from '@/components/custom/schedule/ScheduleHeader'
import React from 'react'
import { View } from 'react-native'



const Schedule = () => {
  return (
    <View className='w-full h-full'>
      <ScheduleHeader />
      <ScheduleContent />
    </View>
  )
}

export default Schedule