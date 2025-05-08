import { MessagesBoxProps } from '@/types/messages'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

const MessagesBox = ({ id, name, range }: MessagesBoxProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => router.push(`/(main)/(messages)/${id}`)}
      className={
        twMerge(
          "bg-background-300 border-2 border-outline-500",
          "flex-row justify-center items-center",
          "rounded-xl px-6 my-3 w-11/12 h-28",
        )}>
      <View className='items-center gap-1 pt-1'>
        <Text className="text-2xl font-psemibold text-secondary-500">
          {name ?? "(Bez názvu)"}
        </Text>
        <Text className="text-lg font-plight text-tertiary-500">
          {range}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default MessagesBox