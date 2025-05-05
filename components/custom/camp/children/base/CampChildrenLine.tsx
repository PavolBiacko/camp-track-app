import { Badge, BadgeText } from '@/components/ui/badge'
import { CampChildrenLineProps } from '@/types/camp'
import { Gender } from '@/types/enums/gender'
import { formatISOLocalToHumanReadable } from '@/utils/dates'
import { getChildBadgeStylesAndText, getProperTextSizeForChildName } from '@/utils/ui'
import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

const ChildrenLine = ({ child }: CampChildrenLineProps) => {
  const nameSize = getProperTextSizeForChildName(child.firstName + " " + child.lastName, 5);
  const { text, styles } = getChildBadgeStylesAndText(child.gender)

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => router.push({ pathname: '/(main)/(camp)/children/update-child', params: { childId: child.id } })}
      className={
        twMerge(
          "items-center rounded-3xl w-10/12 h-40",
          `bg-background-400 border-2 border-${(child.gender === Gender.MALE) ? 'secondary' : 'quaternary'}-500`,
        )}>
      <View className='h-full items-center justify-center gap-2 py-2'>
        <View className='w-full'>
          <Text className={`text-typography-950 font-pbold ${nameSize} pt-2`}>
            {child.firstName} {child.lastName}
          </Text>
        </View>
        <View className='w-full'>
          <Text className='text-outline-600 text-2xl font-plight pb-1'>
            {formatISOLocalToHumanReadable(child.birthDate)}
          </Text>
        </View>
        <View className='flex-row justify-between h-8 gap-5'>
          <Badge className={`justify-center rounded-xl ${styles}`}>
            <BadgeText className='text-typography-950 text-sm font-pbold px-2'>
              {text}
            </BadgeText>
          </Badge>
          <Badge className='justify-center rounded-xl bg-tertiary-300 border border-tertiary-700'>
            <BadgeText className='text-typography-950 text-sm font-pbold px-2'>
              {child.accessCode}
            </BadgeText>
          </Badge>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ChildrenLine