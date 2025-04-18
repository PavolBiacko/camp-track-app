import { FinanceScreenConfigs } from '@/types/finance';
import { getStackScreenOptions } from '@/utils/ui';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

const financeScreenConfigs: FinanceScreenConfigs[] = [
  { name: 'overview', title: 'Celkový prehľad' },
  { name: 'transactions', title: 'Výpis pohybov' },
  { name: 'accounts/index', title: 'Nastavenia účtov detí' },
  { name: 'accounts/money-form', title: '...' },  // set dynamically
  { name: 'calculation', title: 'Výpočet výdavkov' },
  { name: 'buffet', title: 'Návšteva bufetu' },
];

const FinanceLayout = () => {
  const { colorScheme } = useColorScheme()

  return (
    <Stack screenOptions={getStackScreenOptions(colorScheme)}>
      {financeScreenConfigs.map(({ name, title }) => (
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