import { FinanceAccountProvider } from '@/components/custom/context/FinanceAccountContext';
import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext';
import FinanceAccountContent from '@/components/custom/finance/accounts/FinanceAccountContent';
import FinanceAccountFooter from '@/components/custom/finance/accounts/FinanceAccountFooter';
import FinanceAccountHeader from '@/components/custom/finance/accounts/FinanceAccountHeader';
import Loading from '@/components/custom/Loading';
import { useAccountByChildIdWithLeader, useManyAccountsWithLeader } from '@/hooks/models/useGroupAccounts';
import { TransactionType } from '@/types/enums/finance';
import { ChildAccountParams } from '@/types/finance';
import { subtractDecimals } from '@/utils/decimal';
import { getTotalOfChildrenBalances } from '@/utils/finance';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

const MoneyForm = () => {
  const navigation = useNavigation();
  const { childId, leaderId, type } = useLocalSearchParams<ChildAccountParams>();
  const { child, isLoading: isChildLoading, isError: isChildError } = useAccountByChildIdWithLeader(childId ?? null, leaderId);
  const { children, isLoading: isChildrenLoading, isError: isChildrenError } = useManyAccountsWithLeader(leaderId);
  const { totalAmount } = useFinanceOverviewContext();

  // setting the header title
  useEffect(() => {
    if (child === null) {
      navigation.setOptions({
        title: (type === "increment") ? "Výdavok vyplatenia" : "Vyplatenie bufetu",
      });
    }
    if (child) {
      const childName = `${child.firstName} ${child.lastName}`;
      navigation.setOptions({
        title: childName,
      });
    }
  }, [child, type, navigation]);

  if (child === undefined || isChildLoading || isChildError) {
    return <Loading showText={true} />;
  }

  if (!children || isChildrenLoading || isChildrenError) {
    return <Loading showText={true} />;
  }

  const initialBalance = (child) ? child.accountBalance : subtractDecimals(totalAmount, getTotalOfChildrenBalances(children));
  const transactionType = (child)
    ? ((type === "increment") ? TransactionType.DEPOSIT : TransactionType.WITHDRAWAL)
    : ((type === "increment") ? TransactionType.PAYBACK : TransactionType.PAYOUT);

  return (
    <View className='flex-1'>
      <FinanceAccountProvider transactionType={transactionType} initialBalance={initialBalance}>
        <FinanceAccountHeader />
        <FinanceAccountContent />
        <FinanceAccountFooter childId={childId ?? null} />
      </FinanceAccountProvider>
    </View>

  )
}

export default MoneyForm