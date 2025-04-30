import FinanceAccountContentLine from '@/components/custom/finance/accounts/base/FinanceAccountContentLine';
import { getDenominations } from '@/utils/finance';
import { ScrollView } from 'react-native';

const FinanceTransactionContent = () => {
  const denominations = getDenominations();

  return (
    <ScrollView contentContainerClassName="items-center gap-5 py-5 mx-5">
      {denominations.map((denomination, index) => (
        <FinanceAccountContentLine
          key={index}
          denomination={denomination}
        />
      ))}
    </ScrollView>
  )
}

export default FinanceTransactionContent