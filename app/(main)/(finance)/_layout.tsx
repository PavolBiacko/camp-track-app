import { FinanceOverviewProvider } from '@/components/custom/context/FinanceOverviewContext';
import Loading from '@/components/custom/Loading';
import { useCashRegisterByLeader } from '@/hooks/models/useCashRegister';
import { useAuth } from '@/hooks/useAuth';
import { ScreenConfigs } from '@/types/base';
import { getStackScreenOptions } from '@/utils/ui';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

const financeScreenConfigs: ScreenConfigs[] = [
  { name: 'overview', title: 'Celkový prehľad' },
  { name: 'transactions', title: 'Výpis pohybov' },
  { name: 'accounts/index', title: 'Nastavenia účtov detí' },
  { name: 'accounts/money-form', title: '...' },  // set dynamically
  { name: 'calculation', title: 'Výpočet výdavkov' },
  { name: 'buffet', title: 'Návšteva bufetu' },
];

const FinanceLayout = () => {
  const { user } = useAuth();
  const { colorScheme } = useColorScheme();
  const { cashRegister, isLoading, isError } = useCashRegisterByLeader(user?.id!);  // id loaded in tabs layout

  if (!cashRegister || isLoading || isError) {
    return <Loading showText={true} />;
  }

  return (
    <FinanceOverviewProvider cashRegisterData={cashRegister}>
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
    </FinanceOverviewProvider>
  )
}

export default FinanceLayout