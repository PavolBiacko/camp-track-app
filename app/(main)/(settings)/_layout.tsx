import { getStackScreenOptions } from '@/utils/ui'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'

const SettingsLayout = () => {
  const { colorScheme } = useColorScheme()

  return (
    <Stack screenOptions={getStackScreenOptions(colorScheme)}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Nastavenia",
        }}
      />
      <Stack.Screen
        name="privacy-policy"
        options={{
          headerShown: true,
          title: "Ochrana súkromia",
        }}
      />
      <Stack.Screen
        name="terms-of-service"
        options={{
          headerShown: true,
          title: "Podmienky",
        }}
      />
    </Stack>
  )
}

export default SettingsLayout