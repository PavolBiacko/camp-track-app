import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false, animation: 'ios_from_left' }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false, animation: 'ios_from_right' }} />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default AuthLayout