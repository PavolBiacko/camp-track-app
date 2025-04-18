import { FinanceAccountProvider } from '@/components/custom/context/FinanceAccountContext';
import FinanceAccountContent from '@/components/custom/finance/accounts/FinanceAccountContent';
import FinanceAccountFooter from '@/components/custom/finance/accounts/FinanceAccountFooter';
import FinanceAccountHeader from '@/components/custom/finance/accounts/FinanceAccountHeader';
import Loading from '@/components/custom/Loading';
import { useChildById } from '@/hooks/models/useFinance';
import { ChildAccountParams } from '@/types/finance';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

const MoneyForm = () => {
  const navigation = useNavigation();
  const { childId, type } = useLocalSearchParams<ChildAccountParams>();
  const { child, isLoading, isError } = useChildById(childId);

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
        <FinanceAccountFooter type={type} />
      </FinanceAccountProvider>
    </View>

  )
}

export default MoneyForm