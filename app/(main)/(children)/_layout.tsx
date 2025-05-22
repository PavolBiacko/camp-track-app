import { getStackScreenOptions } from '@/utils/ui'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'

const ParentChildLayout = () => {
  const { colorScheme } = useColorScheme()

  return (
    <Stack screenOptions={getStackScreenOptions(colorScheme)}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Transakcie dieťaťa",
        }}
      />
    </Stack>
  )
}

export default ParentChildLayout