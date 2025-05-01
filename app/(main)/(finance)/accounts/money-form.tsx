import { FinanceAccountProvider } from '@/components/custom/context/FinanceAccountContext';
import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext';
import FinanceAccountContent from '@/components/custom/finance/accounts/FinanceAccountContent';
import FinanceAccountFooter from '@/components/custom/finance/accounts/FinanceAccountFooter';
import FinanceAccountHeader from '@/components/custom/finance/accounts/FinanceAccountHeader';
import Loading from '@/components/custom/Loading';
import { useChildByIdWithLeader, useChildrenByLeader } from '@/hooks/models/useChildren';
import { TransactionType } from '@/types/enums/finance';
import { ChildAccountParams } from '@/types/finance';
import { getTotalOfChildrenBalances } from '@/utils/finance';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

const MoneyForm = () => {
  const navigation = useNavigation();
  const { childId, leaderId, type } = useLocalSearchParams<ChildAccountParams>();
  const { child, isLoading: isChildLoading, isError: isChildError } = useChildByIdWithLeader(childId ?? null, leaderId);
  const { children, isLoading: isChildrenLoading, isError: isChildrenError } = useChildrenByLeader(leaderId);
  const { totalAmount } = useFinanceOverviewContext()

  // setting the header title
  useEffect(() => {
    if (child === null) {
      navigation.setOptions({
        title: "Vyplatenie bufetu",
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

  const initialBalance = (child) ? child.accountBalance : totalAmount - getTotalOfChildrenBalances(children);
  const transactionType = (child)
    ? ((type === "increment") ? TransactionType.DEPOSIT : TransactionType.WITHDRAWAL)
    : TransactionType.PURCHASE;

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