import CustomButton from '@/components/custom/CustomButton'
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

const CampLeaderLayout = () => {
  return (
    <>
      <View className="h-1/4 m-5">
        <TouchableOpacity onPress={() => { }} activeOpacity={0.7} className="rounded-3xl justify-center items-center bg-secondary-600 h-full border-2 border-tertiary-500">
          <Avatar size="2xl" className="bg-indigo-600 rounded-full">
            <AvatarFallbackText className="text-white">
              Ronald McDonalds
            </AvatarFallbackText>
          </Avatar>
        </TouchableOpacity>
      </View>
      <View className="h-1/4 m-5">
        <CustomButton handlePress={() => { }} containerStyles="h-full border-2 border-tertiary-500" />
      </View>
      <View className="h-1/4 flex-row justify-between m-5">
        <View className="w-[47%]">
          <CustomButton handlePress={() => { }} containerStyles="h-full border-2 border-tertiary-500" />
        </View>
        <View className="w-[47%]">
          <CustomButton handlePress={() => { }} containerStyles="h-full border-2 border-tertiary-500" />
        </View>
      </View >
    </>
  )
}

export default CampLeaderLayout