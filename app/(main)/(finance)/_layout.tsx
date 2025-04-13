import { getStackScreenOptions } from '@/utils/ui'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'

const FinanceLayout = () => {
  const { colorScheme } = useColorScheme()

  return (
    <Stack screenOptions={{ ...getStackScreenOptions(colorScheme), headerTitleAlign: 'center' }}>
      <Stack.Screen
        name="overview"
        options={{
          headerShown: true,
          title: "Celkový prehľad",
        }}
      />
      <Stack.Screen
        name="transactions"
        options={{
          headerShown: true,
          title: "Výpis pohybov",
        }}
      />
      <Stack.Screen
        name="accounts"
        options={{
          headerShown: true,
          title: "Nastavenia účtov detí",
        }}
      />
      <Stack.Screen
        name="calculation"
        options={{
          headerShown: true,
          title: "Výpočet výdavkov",
        }}
      />
      <Stack.Screen
        name="buffet"
        options={{
          headerShown: true,
          title: "Návšteva bufetu",
        }}
      />
    </Stack>
  )
}

export default FinanceLayout