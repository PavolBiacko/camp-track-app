import Loading from '@/components/custom/Loading'
import ScheduleContent from '@/components/custom/schedule/ScheduleContent'
import ScheduleHeader from '@/components/custom/schedule/ScheduleHeader'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { View } from 'react-native'

const Schedule = () => {
  const { user, isLoading, isError } = useAuth();

  return (
    <View className='w-full h-full'>
      {(!user || isLoading || isError) ? <Loading showText={false} /> : <ScheduleHeader role={user.role} />}
      <ScheduleContent />
    </View>
  )
}

export default Schedule