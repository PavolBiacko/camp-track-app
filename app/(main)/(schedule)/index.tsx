import { ScheduleParams } from '@/types/schedule'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const AddActivity = () => {
  const params = useLocalSearchParams<ScheduleParams>()

  return (
    <View>
      {params.mode === 'add' && <Text className="text-typography-950 text-2xl mt-5 font-pbold">NULL</Text>}
      {params.mode === 'edit' && <Text className="text-typography-950 text-2xl mt-5 font-pbold">{params.activity}</Text>}
    </View>
  )
}

export default AddActivity