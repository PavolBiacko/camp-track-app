import { getStackScreenOptions } from '@/utils/ui'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'

const ScheduleLayout = () => {
  const { colorScheme } = useColorScheme()

  return (
    <Stack screenOptions={getStackScreenOptions(colorScheme)}>
      <Stack.Screen
        name="create-activity"
        options={{
          headerShown: true,
          title: "Vytvárací formulár aktivity",
        }}
      />
      <Stack.Screen
        name="update-activity"
        options={{
          headerShown: true,
          title: "Editačný formulár aktivity",
        }}
      />
    </Stack>
  )
}

export default ScheduleLayout