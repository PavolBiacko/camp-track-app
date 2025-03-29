import ScheduleContent from '@/components/custom/schedule/ScheduleContent'
import ScheduleHeader from '@/components/custom/schedule/ScheduleHeader'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { View } from 'react-native'

const Schedule = () => {
  const { user } = useAuth();

  // should not happen, since useAuth is used in the layout layer
  if (!user) {
    return null;
  }

  return (
    <View className='w-full h-full'>
      <ScheduleHeader role={user.role} />
      <ScheduleContent />
    </View>
  )
}

export default Schedule