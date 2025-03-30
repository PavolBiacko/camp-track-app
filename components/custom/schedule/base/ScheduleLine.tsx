import { ScheduleLineProps } from '@/types/schedule'

import { Text, View } from 'react-native'
import { ClassNameValue, twMerge } from 'tailwind-merge'

const ScheduleLine = (props: ScheduleLineProps) => {
  const textStyles: ClassNameValue = `text-typography-900 text-lg ${props.textStyles}`
  const color = props.isActive ? "secondary" : "background"

  return (
    <View className={
      twMerge(
        "flex-row justify-between items-center",  // layout
        "rounded-xl px-6 my-2 w-11/12 h-20",  // dimensions
        `bg-${color}-300 border-2 border-${color}-700`,  // colors
        props.containerStyles,  // other
      )}>
      <Text className={twMerge(textStyles, "font-pbold")}>{props.title}</Text>
      <Text className={twMerge(textStyles, "font-psemibold")}>{props.time.hours}:{props.time.minutes}</Text>
    </View>
  )
}

export default ScheduleLine