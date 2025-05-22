import EmptyScreenMessage from '@/components/custom/EmptyScreenMessage';
import FinanceTransactionLine from '@/components/custom/finance/transactions/base/FinanceTransactionLine';
import Loading from '@/components/custom/Loading';
import { useTransactionsByAccount } from '@/hooks/models/useTransactions';
import { ChildAccountTransactionParams } from '@/types/children';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChildAccountTransactionContent = () => {
  const { groupId, childId } = useLocalSearchParams<ChildAccountTransactionParams>();

  const { transactions, isLoading, isError } = useTransactionsByAccount(parseInt(groupId), childId);

  if (!transactions || isLoading || isError) {
    return <Loading showText={false} />;
  }

  if (transactions.length === 0) {
    return <EmptyScreenMessage text='Nie sú zaznamenané žiadne pohyby pre daný účet.' />;
  }

  return (
    <SafeAreaView className='justify-center h-full'>
      <ScrollView contentContainerClassName="items-center gap-5 py-5">
        {transactions.map((transaction, index) => (
          <FinanceTransactionLine
            key={index}
            transaction={transaction}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChildAccountTransactionContent