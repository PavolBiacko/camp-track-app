import FinanceAccountContent from '@/components/custom/finance/accounts/FinanceAccountContent';
import FinanceAccountHeader from '@/components/custom/finance/accounts/FinanceAccountHeader';
import { ChildAccountParams } from '@/types/finance';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const AddMoneyToAccount = () => {
  const { childId, type } = useLocalSearchParams<ChildAccountParams>();

  return (
    <View className='flex-1'>
      <FinanceAccountHeader type={type} />
      <FinanceAccountContent type={type} />
    </View>

  )
}

export default AddMoneyToAccount