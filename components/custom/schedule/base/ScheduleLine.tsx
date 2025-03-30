import { ScheduleLineProps } from '@/types/schedule'
import { getActivityStyles } from '@/utils'

import { Text, TouchableOpacity } from 'react-native'
import { ClassNameValue, twMerge } from 'tailwind-merge'

const ScheduleLine = (props: ScheduleLineProps) => {
  const textStyles: ClassNameValue = `text-typography-900 text-lg ${props.textStyles}`
  const statusContainterStyles = getActivityStyles(props.status)

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className={
        twMerge(
          "flex-row justify-between items-center",
          "rounded-xl px-6 my-2 w-11/12 h-14",
          statusContainterStyles,
          props.containerStyles,
        )}>
      <Text className={twMerge(textStyles, "font-pbold")}>
        {props.title}
      </Text>
      <Text className={twMerge(textStyles, "font-psemibold")}>
        {props.time.hours}:{props.time.minutes}
      </Text>
    </TouchableOpacity>
  )
}

export default ScheduleLine