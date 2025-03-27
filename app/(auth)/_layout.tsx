import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'

const AuthLayout = () => {
  const { colorScheme } = useColorScheme()

  return (
    <Stack screenOptions={{
      headerShown: false,
      animation: 'ios_from_right',
      contentStyle: { backgroundColor: getRGBColor("background", "0", colorScheme) }
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  )
}

export default AuthLayout