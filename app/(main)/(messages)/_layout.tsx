import { getStackScreenOptions } from '@/utils/ui'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'

const MessagesLayout = () => {
  const { colorScheme } = useColorScheme()

  return (
    <Stack screenOptions={getStackScreenOptions(colorScheme)}>
      <Stack.Screen
        name="[chatId]"
        options={{
          headerShown: true,
          title: "...",
        }}
      />
      <Stack.Screen
        name="chat-settings"
        options={{
          headerShown: true,
          title: "Nastavenia četu",
        }}
      />
    </Stack>
  )
}

export default MessagesLayout