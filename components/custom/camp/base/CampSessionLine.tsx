import { CampSessionLineProps } from '@/types/camp'
import { formatISOLocalToHumanReadable } from '@/utils/dates'
import { Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

const CampSessionLine = (props: CampSessionLineProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className={
        twMerge(
          "flex-row justify-around items-center",
          "rounded-xl w-11/12 h-24",
          `bg-background-300 border-2 border-outline-300`,
        )}>
      <View className="items-center bg-secondary-300 border-2 border-secondary-700 rounded-full p-2">
        <Text className="text-typography-800 font-pbold text-lg mt-1">
          1. turnus
        </Text>
      </View>
      <View className='flex-row items-center gap-4'>
        <View className="items-center bg-tertiary-300 border-2 border-tertiary-700 rounded-xl p-2">
          <Text className="text-typography-800 font-pbold text-md mt-1">
            {formatISOLocalToHumanReadable(props.beginDate)}
          </Text>
        </View>
        <View className="items-center bg-tertiary-300 border-2 border-tertiary-700 rounded-xl p-2">
          <Text className="text-typography-800 font-pbold text-md mt-1">
            {formatISOLocalToHumanReadable(props.endDate)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CampSessionLine