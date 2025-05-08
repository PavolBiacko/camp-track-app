import AppProviders from '@/components/custom/AppProviders'
import { getStackScreenOptions } from '@/utils/ui'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'

const AppLayout = () => {
  const { colorScheme } = useColorScheme();

  return (
    <AppProviders>
      <Stack screenOptions={getStackScreenOptions(colorScheme)}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(settings)" />
        <Stack.Screen name="(schedule)" />
        <Stack.Screen name="(finance)" />
        <Stack.Screen name="(camp)" />
        <Stack.Screen name="(messages)" />
      </Stack>
    </AppProviders>
  )
}

export default AppLayout