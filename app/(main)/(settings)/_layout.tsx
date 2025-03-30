import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'

const _layout = () => {
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

export default _layout