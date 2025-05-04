import { CampSessionLineProps } from '@/types/camp'
import { formatISOLocalToHumanReadable } from '@/utils/dates'
import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

const CampSessionLine = ({ campSession, order }: CampSessionLineProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => router.push({ pathname: '/(main)/(camp)/sessions/update-session', params: { campSessionId: campSession.id } })}
      className={
        twMerge(
          "flex-row items-center",
          "rounded-xl h-24 mx-2",
          `bg-background-400 border border-outline-400`,
        )}>
      <View className='w-[25%] h-full items-center justify-center flex-row'>
        <View className="w-16 items-center bg-secondary-300 border-2 border-secondary-700 rounded-full p-2">
          <Text className="text-typography-800 font-pbold text-3xl mt-2">
            {order}
          </Text>
        </View>
      </View>
      <View className='w-[75%] h-full items-center justify-center flex-row border-l border-outline-500 gap-3'>
        <View className="bg-tertiary-300 border-2 border-tertiary-700 rounded-xl p-2">
          <Text className="text-typography-800 font-pbold text-md mt-1">
            {formatISOLocalToHumanReadable(campSession.beginDate)}
          </Text>
        </View>
        <Text className="text-typography-800 font-pbold text-md mt-1">
          -
        </Text>
        <View className="bg-tertiary-300 border-2 border-tertiary-700 rounded-xl p-2">
          <Text className="text-typography-800 font-pbold text-md mt-1">
            {formatISOLocalToHumanReadable(campSession.endDate)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CampSessionLine