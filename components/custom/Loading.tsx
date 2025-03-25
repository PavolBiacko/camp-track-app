import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

const Loading = () => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 bg-background-0 justify-center">
      <Text className="text-typography-950 text-2xl font-psemibold self-center">Načítavanie...</Text>
      <ActivityIndicator size="large" color={getRGBColor("primary", "500", colorScheme)} />
    </View>
  )
}

export default Loading