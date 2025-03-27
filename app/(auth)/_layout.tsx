import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'

const AuthLayout = () => {
  const { colorScheme } = useColorScheme()

  return (
    <Stack screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: getRGBColor("background", "0", colorScheme) }
    }}>
      <Stack.Screen
        name="index"
        options={{ animation: 'ios_from_right' }}
      />
      <Stack.Screen
        name="login"
        options={{ animation: 'ios_from_right' }}
      />
      <Stack.Screen
        name="register"
        options={{ animation: 'ios_from_right' }}
      />
    </Stack>
  )
}

export default AuthLayout