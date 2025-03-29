import CustomButton from '@/components/custom/CustomButton'
import { UserRoles } from '@/types/enums/roles'
import { ScheduleHeaderProps } from '@/types/schedule'
import React from 'react'
import { View } from 'react-native'

const ScheduleHeader = ({ role }: ScheduleHeaderProps) => {
  return (
    <View className="border-b border-outline-300 justify-center items-center py-5">
      <CustomButton
        title="21.7.2023, streda"
        action="tertiary"
        variant="combined"
        handlePress={() => { }}
        textStyles='text-3xl font-pbold self-center mt-2'
        containerStyles="w-11/12 h-20 rounded-3xl"
      />
      {(role === UserRoles.GROUP_LEADER || role === UserRoles.CAMP_LEADER) && <CustomButton
        title="Pridaj novú aktivitu"
        action="primary"
        variant="combined"
        handlePress={() => { }}
        textStyles='text-lg font-pbold self-center'
        containerStyles="w-1/2 h-16 mt-5 rounded-3xl"
      />}
    </View>
  )
}

export default ScheduleHeader