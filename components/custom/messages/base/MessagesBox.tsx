import { MessagesBoxProps } from '@/types/messages'
import { isDateRangeActive } from '@/utils/dates'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

const MessagesBox = ({ id, name, range }: MessagesBoxProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => router.push({ pathname: "/(main)/(messages)", params: { chatId: id, chatName: name } })}
      className={
        twMerge(
          "bg-background-400 border-2 border-quaternary-500",
          "flex-row justify-center items-center",
          "rounded-xl px-6 my-3 w-11/12 h-28",
          `${isDateRangeActive(range) ? 'bg-quaternary-300' : 'bg-background-400'}`,
        )}>
      <View className='items-center gap-1 pt-1'>
        <Text className="text-typography-950 text-2xl font-pextrabold">
          {name ?? "(Bez názvu)"}
        </Text>
        <Text className="text-lg font-pregular text-typography-950">
          {range}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default MessagesBox