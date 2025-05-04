import { Badge, BadgeText } from '@/components/ui/badge'
import { useGroupBasicByLeader } from '@/hooks/models/useGroups'
import { UserRoles } from '@/types/enums/roles'
import { ProfileBadgeProps } from '@/types/settings'
import { getBadgeStylesAndText } from '@/utils/ui'
import React from 'react'
import { View } from 'react-native'

const ProfileBadge = ({ user }: ProfileBadgeProps) => {
  const { text, styles } = getBadgeStylesAndText(user.role);
  const { groupBasic, isLoading, isError } = useGroupBasicByLeader(user.id);

  return (
    <View className='flex flex-row gap-2'>
      <Badge className={`${styles} rounded-xl mt-2`}>
        <BadgeText className='text-typography-950 text-xs font-pbold px-2'>{text}</BadgeText>
      </Badge>
      {user.role === UserRoles.GROUP_LEADER && (
        <Badge className={`${styles} justify-center rounded-xl mt-2 w-20`}>
          {!groupBasic || isLoading || isError
            ? (
              <BadgeText className='text-typography-950 text-xs font-pbold px-2'>
                .....
              </BadgeText>
            ) : (
              <BadgeText className='text-typography-950 text-xs font-pbold px-2'>
                {groupBasic.number}. ODD
              </BadgeText>
            )
          }
        </Badge>
      )}
    </View>
  )
}

export default ProfileBadge