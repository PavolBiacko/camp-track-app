import { ScheduleLineProps } from '@/types/schedule'
import { getColorByTime } from '@/utils'
import { Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

const ScheduleLine = (props: ScheduleLineProps) => {
  const textStyles = `text-typography-800 text-lg mt-1 ${props.textStyles}`

  const color = getColorByTime(props.time)

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