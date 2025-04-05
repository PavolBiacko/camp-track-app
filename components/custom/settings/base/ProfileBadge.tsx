import { Badge, BadgeText } from '@/components/ui/badge'
import { UserRoles } from '@/types/enums/roles'
import { ProfileBadgeProps } from '@/types/settings'
import { getBadgeStylesAndText } from '@/utils/ui'
import React from 'react'
import { View } from 'react-native'

const ProfileBadge = ({ role }: ProfileBadgeProps) => {
  const { text, styles } = getBadgeStylesAndText(role);

  return (
    <View className='flex flex-row gap-2'>
      <Badge className={`${styles} rounded-xl mt-2`}>
        <BadgeText className='text-typography-950 text-xs font-pbold px-2'>{text}</BadgeText>
      </Badge>
      {role === UserRoles.GROUP_LEADER && (
        <Badge className={`${styles} rounded-xl mt-2`}>
          <BadgeText className='text-typography-950 text-xs font-pbold px-2'>6. ODD</BadgeText>
        </Badge>
      )}
    </View>
  )
}

export default ProfileBadge