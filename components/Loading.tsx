import { colors } from '@/constants'
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

const Loading = () => {
  return (
    <View className="bg-darkHigh flex-1 justify-center">
      <Text className="text-white font-psemibold self-center">Načítavanie...</Text>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  )
}

export default Loading