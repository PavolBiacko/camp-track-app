import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

const Loading = () => {
  return (
    <View className="bg-darkHigh flex-1 justify-center">
      <Text className="text-white font-psemibold self-center">Načítavanie...</Text>
      <ActivityIndicator size="large" color="#FF9001" />
    </View>
  )
}

export default Loading