import { getStackScreenOptions } from '@/utils/ui'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'

const CampLayout = () => {
  const { colorScheme } = useColorScheme()

  return (
    <Stack screenOptions={getStackScreenOptions(colorScheme)}>
      <Stack.Screen
        name="sessions"
        options={{
          headerShown: true,
          title: "Turnusy",
        }}
      />
      <Stack.Screen
        name="children"
        options={{
          headerShown: true,
          title: "Deti",
        }}
      />
      <Stack.Screen
        name="groups"
        options={{
          headerShown: true,
          title: "Oddiely",
        }}
      />
    </Stack>
  )
}

export default CampLayout