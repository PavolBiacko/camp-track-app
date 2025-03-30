import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'

const ScheduleLayout = () => {
  const { colorScheme } = useColorScheme()

  return (
    <Stack screenOptions={{
      animation: 'ios_from_right',
      headerShown: false,
      headerStyle: { backgroundColor: getRGBColor("background", "0", colorScheme) },
      headerTitleStyle: { color: getRGBColor("typography", "950", colorScheme) },
      headerTintColor: getRGBColor("typography", "950", colorScheme),
      contentStyle: { backgroundColor: getRGBColor("background", "0", colorScheme) }
    }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Pridaj aktivitu",
        }}
      />
    </Stack>
  )
}

export default ScheduleLayout