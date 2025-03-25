import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'
import React from 'react'

const _layout = () => {
  const { colorScheme } = useColorScheme()

  return (
    <Stack screenOptions={{
      headerShown: true,
      title: "Nastavenia",
      headerStyle: { backgroundColor: getRGBColor("background", "0", colorScheme) },
      headerTitleStyle: { color: getRGBColor("typography", "950", colorScheme) },
      headerTintColor: getRGBColor("typography", "950", colorScheme),
    }}>
      <Stack.Screen name="index" options={{ animation: 'ios_from_right' }} />
    </Stack>
  )
}

export default _layout