import ScheduleContent from '@/components/custom/schedule/ScheduleContent'
import ScheduleHeader from '@/components/custom/schedule/ScheduleHeader'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Schedule = () => {
  const { user } = useAuth();

  if (!user) {
    return null;  // should not happen, since useAuth is used in the layout layer
  }

  return (
    <SafeAreaView className='w-full h-full'>
      <ScheduleHeader role={user.role} />
      <ScheduleContent />
    </SafeAreaView>
  )
}

export default Schedule