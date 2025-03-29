import { ScheduleLineProps } from '@/types/schedule'
import React from 'react'
import { Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

const ScheduleLine = (props: ScheduleLineProps) => {
  const textStyles = `text-typography-800 text-lg mt-1 ${props.textStyles}`

  return (
    <View className={
      twMerge(
        "flex-row justify-between items-center",  // layout
        "rounded-xl px-3 my-2 w-11/12 h-20",  // dimensions
        `bg-${props.color}-300 border-2 border-${props.color}-700`,  // colors
        props.containerStyles,  // other
      )}>
      <Text className={twMerge(textStyles, "font-pbold")}>{props.title}</Text>
      <Text className={twMerge(textStyles, "font-psemibold")}>{props.time}</Text>
    </View>
  )
}

export default ScheduleLine