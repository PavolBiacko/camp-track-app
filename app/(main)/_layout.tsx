import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React from 'react'

const _layout = () => {
  const { colorScheme } = useColorScheme()

  return (
    <Stack screenOptions={{
      headerShown: false,
      animation: 'ios_from_right',
      contentStyle: { backgroundColor: getRGBColor("background", "0", colorScheme) }
    }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(settings)" />
    </Stack>
  )
}

export default _layout