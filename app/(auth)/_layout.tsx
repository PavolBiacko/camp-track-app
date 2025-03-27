import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ animation: 'ios_from_right' }} />
      <Stack.Screen name="login" options={{ animation: 'ios_from_right' }} />
      <Stack.Screen name="register" options={{ animation: 'ios_from_right' }} />
    </Stack>
  )
}

export default AuthLayout