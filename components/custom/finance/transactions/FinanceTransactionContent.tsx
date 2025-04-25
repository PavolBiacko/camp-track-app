import FinanceTransactionLine from '@/components/custom/finance/transactions/base/FinanceTransactionLine';
import { useTransactionsInDateRange } from '@/hooks/models/useFinance';
import { ScrollView } from 'react-native';
import { useFinanceTransactionContext } from '../../context/FinanceTransactionContext';
import Loading from '../../Loading';

// const dummyData: TransactionComplex[] = [
//   {
//     id: 1,
//     child: { firstName: 'John', lastName: 'Doe' },
//     amount: 100,
//     type: TransactionType.DEPOSIT,
//     date: new Date(),
//     createdAt: new Date(),
//   },
//   {
//     id: 2,
//     child: { firstName: 'Jane', lastName: 'Smith' },
//     amount: -50,
//     type: TransactionType.WITHDRAWAL,
//     date: new Date(),
//     createdAt: new Date(),
//   },
//   {
//     id: 3,
//     child: { firstName: 'Alice', lastName: 'Johnson' },
//     amount: 200,
//     type: TransactionType.PURCHASE,
//     date: new Date(),
//     createdAt: new Date(),
//   },
//   {
//     id: 4,
//     child: { firstName: 'Bob', lastName: 'Brown' },
//     amount: -75,
//     type: TransactionType.WITHDRAWAL,
//     date: new Date(),
//     createdAt: new Date(),
//   },
//   {
//     id: 5,
//     child: { firstName: 'Charlie', lastName: 'Davis' },
//     amount: 150,
//     type: TransactionType.DEPOSIT,
//     date: new Date(),
//     createdAt: new Date(),
//   },
//   {
//     id: 6,
//     child: { firstName: 'Eve', lastName: 'Wilson' },
//     amount: -30,
//     type: TransactionType.PURCHASE,
//     date: new Date(),
//     createdAt: new Date(),
//   },
// ]

const FinanceAccountContent = () => {
  const { dateFrom, dateTo } = useFinanceTransactionContext();
  const { transactions, isLoading, isError } = useTransactionsInDateRange(dateFrom, dateTo);

  if (!transactions || isLoading || isError) {
    return <Loading showText={false} />;
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