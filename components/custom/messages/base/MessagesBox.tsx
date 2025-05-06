import { MessagesBoxProps } from '@/types/messages'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

const MessagesBox = ({ groupName }: MessagesBoxProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => { }}
      className={
        twMerge(
          "bg-background-300 border-2 border-outline-500",
          "flex-row justify-center items-center",
          "rounded-xl px-6 my-3 w-11/12 h-28",
        )}>
      <View className='pt-1'>
        <Text className="text-2xl font-pbold text-typography-800">
          {groupName}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default MessagesBox