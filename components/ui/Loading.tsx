import { colors } from '@/constants'
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

const Loading = () => {
  return (
    <View className="bg-background-0 flex-1 justify-center">
      <Text className="text-typography-950 font-psemibold self-center">Načítavanie...</Text>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  )
}

export default Loading