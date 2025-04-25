import { useAuth } from '@/hooks/useAuth'
import { UserRoles } from '@/types/enums/roles'
import { ScheduleLineProps } from '@/types/schedule'
import { getActivityStyles } from '@/utils/ui'
import { router } from 'expo-router'

import { Text, TouchableOpacity } from 'react-native'
import { ClassNameValue, twMerge } from 'tailwind-merge'

const ScheduleLine = (props: ScheduleLineProps) => {
  const { user } = useAuth();

  if (!user) {
    return null;  // should not happen, since useAuth is used in the layout layer
  }

  const textStyles: ClassNameValue = `text-typography-900 text-lg pt-1 ${props.textStyles}`;
  const statusContainterStyles = getActivityStyles(props.status, props.isCustom);

  const { id, name, time: { hours, minutes }, leaderId } = props.activity;

  const handleUpdateActivity = () => {
    if (user.role === UserRoles.CAMP_LEADER || leaderId === user.id) {
      router.push({ pathname: '/(main)/(schedule)/update-activity', params: { activityId: id } })
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handleUpdateActivity}
      className={
        twMerge(
          "flex-row justify-between items-center",
          "rounded-xl px-6 my-2 w-11/12 h-14",
          statusContainterStyles,
          props.containerStyles,
        )}>
      <Text className={twMerge(textStyles, "font-pbold")}>{name}</Text>
      <Text className={twMerge(textStyles, "font-psemibold")}>{hours}:{minutes}</Text>
    </TouchableOpacity>
  )
}

export default ScheduleLine