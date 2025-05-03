import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext';
import EmptyScreenMessage from '@/components/custom/EmptyScreenMessage';
import FinanceCalculationContent from '@/components/custom/finance/calculation/FinanceCalculationContent';
import FinanceCalculationFooter from '@/components/custom/finance/calculation/FinanceCalculationFooter';
import FinanceCalculationHeader from '@/components/custom/finance/calculation/FinanceCalculationHeader';
import Loading from '@/components/custom/Loading';
import { useChildrenByLeader } from '@/hooks/models/useChildren';
import { useAuth } from '@/hooks/useAuth';
import { ChildBalanceRecord } from '@/types/finance';
import { distributeCash } from '@/utils/calculation';
import { getTotalOfChildrenBalances } from '@/utils/finance';
import { useMemo } from 'react';
import { View } from 'react-native';

const Calculation = () => {
  const { user } = useAuth();  // should be defined, since useAuth is used in the layout layer
  const { totalAmount, quantities } = useFinanceOverviewContext();
  const { children, isLoading, isError } = useChildrenByLeader(user?.id!);

  const childrenBalancesTotal = useMemo(() => {
    if (!children || isLoading || isError) return 0;
    return getTotalOfChildrenBalances(children);
  }, [children, isLoading, isError]);

  const balances: ChildBalanceRecord[] = useMemo(() => {
    if (!children || isLoading || isError) return [];
    return children.map(child => ({ id: child.id, accountBalance: child.accountBalance }));
  }, [children, isLoading, isError]);

  const { exchanges, distribution } = useMemo(() => {
    if (Object.keys(balances).length === 0) {
      return { exchanges: { from: {}, to: {} }, distribution: {} };
    }
    return distributeCash(quantities, balances);
  }, [quantities, balances]);

  if (!children || isLoading || isError) {
    return <Loading showText={false} />;
  }

  if (totalAmount !== childrenBalancesTotal) {
    return <EmptyScreenMessage text='Nie je možné vykonať výpočet. Je potrebné vyplatiť bufet.' />;
  }

  return (
    <View className='flex-1'>
      <FinanceCalculationHeader exchanges={exchanges} />
      <FinanceCalculationContent distribution={distribution} children={children} />
      <FinanceCalculationFooter children={children} />
    </View>
  )
}

export default Calculation