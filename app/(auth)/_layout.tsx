import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" options={{ animation: 'ios_from_right' }} />
        <Stack.Screen name="sign-in" options={{ animation: 'ios_from_right' }} />
        <Stack.Screen name="sign-up" options={{ animation: 'ios_from_right' }} />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default AuthLayout