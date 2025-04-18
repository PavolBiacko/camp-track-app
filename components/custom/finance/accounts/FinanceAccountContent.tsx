import FinanceAccountContentLine from '@/components/custom/finance/accounts/base/FinanceAccountContentLine';
import { FinanceAccountContentProps } from '@/types/finance';
import { getDenominations } from '@/utils/finance';
import { ScrollView } from 'react-native';

const FinanceAccountContent = ({ type }: FinanceAccountContentProps) => {
  const denominations = getDenominations();

  return (
    <ScrollView contentContainerClassName="items-center gap-5 py-5 mx-5">
      {denominations.map((denomination, index) => (
        <FinanceAccountContentLine
          key={index}
          denomination={denomination}
          type={type}
        />
      ))}
    </ScrollView>
  )
}

export default FinanceAccountContent