import { useFinanceTransactionContext } from '@/components/custom/context/FinanceTransactionContext';
import EmptyScreenMessage from '@/components/custom/EmptyScreenMessage';
import FinanceTransactionLine from '@/components/custom/finance/transactions/base/FinanceTransactionLine';
import Loading from '@/components/custom/Loading';
import { useTransactionsInDateRange } from '@/hooks/models/useTransactions';
import { useAuth } from '@/hooks/useAuth';
import { ScrollView } from 'react-native';

const FinanceAccountContent = () => {
  const { user } = useAuth();
  const { dateFrom, dateTo } = useFinanceTransactionContext();
  const { transactions, isLoading, isError } = useTransactionsInDateRange(dateFrom, dateTo, user?.id!);

  if (!transactions || isLoading || isError) {
    return <Loading showText={false} />;
  }

  if (transactions.length === 0) {
    return <EmptyScreenMessage text='V danom období nie sú zaznamenané žiadne pohyby.' />;
  }

  return (
    <ScrollView contentContainerClassName="items-center gap-5 py-5">
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