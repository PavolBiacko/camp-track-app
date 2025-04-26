import { useFinanceTransactionContext } from '@/components/custom/context/FinanceTransactionContext';
import FinanceTransactionLine from '@/components/custom/finance/transactions/base/FinanceTransactionLine';
import Loading from '@/components/custom/Loading';
import { useTransactionsInDateRange } from '@/hooks/models/useFinance';
import { ScrollView, Text, View } from 'react-native';

const FinanceAccountContent = () => {
  const { dateFrom, dateTo } = useFinanceTransactionContext();
  const { transactions, isLoading, isError } = useTransactionsInDateRange(dateFrom, dateTo);

  if (!transactions || isLoading || isError) {
    return <Loading showText={false} />;
  }

  if (transactions.length === 0) {
    return (
      <View className="flex-1 justify-center items-center h-full">
        <Text className="text-typography-500 text-center text-2xl font-pregular mx-10">
          Neboli zatiaľ zaznamenané žiadne pohyby
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerClassName="items-center gap-5 py-5 ">
      {transactions.map((transaction, index) => (
        <FinanceTransactionLine
          key={index}
          transaction={transaction}
        />
      ))}
    </ScrollView>
  )
}

export default FinanceAccountContent