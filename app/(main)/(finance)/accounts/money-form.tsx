import FinanceAccountContent from '@/components/custom/finance/accounts/FinanceAccountContent';
import FinanceAccountFooter from '@/components/custom/finance/accounts/FinanceAccountFooter';
import FinanceAccountHeader from '@/components/custom/finance/accounts/FinanceAccountHeader';
import Loading from '@/components/custom/Loading';
import { useChildById } from '@/hooks/models/useFinance';
import { ChildAccountParams } from '@/types/finance';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

const AddMoneyToAccount = () => {
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
      <FinanceAccountHeader type={type} />
      <FinanceAccountContent type={type} />
      <FinanceAccountFooter type={type} />
    </View>

  )
}

export default AddMoneyToAccount