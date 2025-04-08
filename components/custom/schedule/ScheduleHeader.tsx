import CustomButton from '@/components/custom/CustomButton'
import ScheduleDatePicker from '@/components/custom/schedule/base/ScheduleDatePicker'
import { UserRoles } from '@/types/enums/roles'
import { ScheduleHeaderProps } from '@/types/schedule'
import { router } from 'expo-router'
import { View } from 'react-native'

const ScheduleHeader = ({ role }: ScheduleHeaderProps) => {
  return (
    <View className="border-b border-outline-300 justify-center items-center py-5">
      <ScheduleDatePicker />
      {(role === UserRoles.GROUP_LEADER || role === UserRoles.CAMP_LEADER) && <CustomButton
        title="Pridaj novú aktivitu"
        action="primary"
        variant="combined"
        handlePress={() => router.push('/(main)/(schedule)/create-activity')}
        textStyles='text-lg font-pbold self-center'
        containerStyles="w-1/2 h-16 mt-5 rounded-3xl"
      />}
    </View>
  )
}

export default ScheduleHeader