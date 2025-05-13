import CampGroupsLine from '@/components/custom/camp/groups/base/CampGroupsLine'
import { CampGroupsBoxProps } from '@/types/camp'
import { formatISOLocalToHumanReadable } from '@/utils/dates'
import { Text, View } from 'react-native'

const CampGroupsBox = (props: CampGroupsBoxProps) => {
  const startDate = formatISOLocalToHumanReadable(props.sessionGroups[0].session.beginDate);
  const endDate = formatISOLocalToHumanReadable(props.sessionGroups[0].session.endDate);
  return (
    <View className='items-center'>
      <Text className="text-typography-800 font-pbold text-2xl mb-2">
        {startDate} - {endDate}
      </Text>
      <View className="w-11/12 items-center justify-center border-2 border-outline-500 rounded-2xl gap-5 py-5">
        {props.sessionGroups.map((group, index) => (
          <CampGroupsLine
            key={index}
            group={group}
          />
        ))}
      </View>
    </View>
  )
}

export default CampGroupsBox