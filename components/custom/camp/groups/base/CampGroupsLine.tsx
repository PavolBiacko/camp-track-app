import CampGroupsLineText from '@/components/custom/camp/groups/base/CampGroupsLineText'
import { CampGroupsLineProps } from '@/types/camp'
import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

const CampGroupsLine = (props: CampGroupsLineProps) => {
  const firstName = props.group.leader?.firstName;
  const lastName = props.group.leader?.lastName;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => router.push({ pathname: '/(main)/(camp)/groups/update-group', params: { groupId: props.group.id } })}
      className={
        twMerge(
          "flex-row items-center",
          "rounded-xl h-28 mx-2",
          `bg-background-400 border border-outline-400`,
        )
      }>
      <View className='w-[35%] h-full items-center justify-center flex-row'>
        <View className="h-16 justify-center items-center bg-secondary-300 border-2 border-secondary-700 rounded-2xl px-2">
          <Text className="text-typography-800 font-pbold text-2xl pt-1">
            {props.group.number}. ODD
          </Text>
        </View>
      </View>
      <View className='w-[65%] h-full items-center justify-center flex-row border-l border-outline-500 gap-3 px-3'>
        <View className={
          twMerge(
            "w-full items-center",
            (firstName && lastName)
              ? "bg-tertiary-300  border-tertiary-700"
              : "bg-background-300 border-outline-500",
            "border-2 rounded-2xl py-3"
          )}>
          <CampGroupsLineText
            firstName={firstName}
            lastName={lastName}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CampGroupsLine