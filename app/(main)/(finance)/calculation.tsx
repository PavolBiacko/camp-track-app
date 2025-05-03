import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext';
import EmptyScreenMessage from '@/components/custom/EmptyScreenMessage';
import FinanceCalculationContent from '@/components/custom/finance/calculation/FinanceCalculationContent';
import FinanceCalculationFooter from '@/components/custom/finance/calculation/FinanceCalculationFooter';
import FinanceCalculationHeader from '@/components/custom/finance/calculation/FinanceCalculationHeader';
import Loading from '@/components/custom/Loading';
import { useChildrenByLeader } from '@/hooks/models/useChildren';
import { useAuth } from '@/hooks/useAuth';
import { FinanceCalculationBalances } from '@/types/finance';
import { distributeCash } from '@/utils/calculation';
import { getTotalOfChildrenBalances } from '@/utils/finance';
import { View } from 'react-native';

const Calculation = () => {
  const { user } = useAuth();  // should be defined, since useAuth is used in the layout layer
  const { totalAmount, quantities } = useFinanceOverviewContext();
  const { children, isLoading, isError } = useChildrenByLeader(user?.id!);

  if (!children || isLoading || isError) {
    return <Loading showText={false} />;
  }

  const childrenBalancesTotal = getTotalOfChildrenBalances(children);
  const balances: FinanceCalculationBalances = children.reduce((acc, child) => ({ ...acc, [child.id]: child.accountBalance }), {});

  // console.log(quantities);
  // console.log(JSON.stringify(balances, null, 2));
  // console.log(JSON.stringify(children, null, 2));

  // console.log(balances["f500c680-62e0-438c-9bc9-bac94a6a4f5f"])

  if (totalAmount !== childrenBalancesTotal) {
    return <EmptyScreenMessage text='Nie je možné vykonať výpočet. Je potrebné vyplatiť bufet.' />;
  }

  const { distribution, exchange } = distributeCash(quantities, balances);

  return (
    <View className='flex-1'>
      <FinanceCalculationHeader exchange={exchange} />
      <FinanceCalculationContent distribution={distribution} children={children} />
      <FinanceCalculationFooter />
    </View>
  )
}

export default Calculation