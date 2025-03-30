import { ScheduleLineProps } from '@/types/schedule'
import { getActivityStyles } from '@/utils'

import { Text, TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'

const ScheduleLine = (props: ScheduleLineProps) => {
  const { statusContainterStyles, statusTextStyles } = getActivityStyles(props.status)

  return (
    <TouchableOpacity className={
      twMerge(
        "flex-row justify-between items-center",
        "rounded-xl px-6 my-2 w-11/12 h-14",
        statusContainterStyles,
        props.containerStyles,
      )}>
      <Text className={twMerge(props.textStyles, statusTextStyles, "font-pbold")}>
        {props.title}
      </Text>
      <Text className={twMerge(props.textStyles, statusTextStyles, "font-psemibold")}>
        {props.time.hours}:{props.time.minutes}
      </Text>
    </TouchableOpacity>
  )
}

export default ScheduleLine