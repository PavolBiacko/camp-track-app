import { getStackScreenOptions } from '@/utils/ui';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

const screenConfigs = [
  { name: 'overview', title: 'Celkový prehľad' },
  { name: 'transactions', title: 'Výpis pohybov' },
  { name: 'accounts/index', title: 'Nastavenia účtov detí' },
  { name: 'accounts/money-form', title: 'Pridávanie peňazí' },
  { name: 'calculation', title: 'Výpočet výdavkov' },
  { name: 'buffet', title: 'Návšteva bufetu' },
];

const FinanceLayout = () => {
  const { colorScheme } = useColorScheme()

  return (
    <Stack screenOptions={getStackScreenOptions(colorScheme)}>
      {screenConfigs.map(({ name, title }) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{
            headerShown: true,
            title,
          }}
        />
      ))}
    </Stack>
  )
}

export default FinanceLayout