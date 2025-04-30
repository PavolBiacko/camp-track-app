import { FinanceAccountProvider } from '@/components/custom/context/FinanceAccountContext';
import FinanceAccountContent from '@/components/custom/finance/accounts/FinanceAccountContent';
import FinanceAccountFooter from '@/components/custom/finance/accounts/FinanceAccountFooter';
import FinanceAccountHeader from '@/components/custom/finance/accounts/FinanceAccountHeader';
import Loading from '@/components/custom/Loading';
import { useChildByIdWithLeader } from '@/hooks/models/useChildren';
import { ChildAccountParams } from '@/types/finance';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

const MoneyForm = () => {
  const navigation = useNavigation();
  const { childId, leaderId, type } = useLocalSearchParams<ChildAccountParams>();
  const { child, isLoading, isError } = useChildByIdWithLeader(childId, leaderId);

  // setting the header title
  useEffect(() => {
    if (child) {
      const childName = `${child.firstName} ${child.lastName}`;
      navigation.setOptions({
        title: childName,
      });
    }
  }, [child, type, navigation]);

  if (!child || isLoading || isError) {
    return <Loading showText={true} />;
  }

  return (
    <View className='flex-1'>
      <FinanceAccountProvider initialBalance={child.accountBalance} type={type}>
        <FinanceAccountHeader type={type} />
        <FinanceAccountContent type={type} />
        <FinanceAccountFooter type={type} childId={child.id} />
      </FinanceAccountProvider>
    </View>

  )
}

export default MoneyForm