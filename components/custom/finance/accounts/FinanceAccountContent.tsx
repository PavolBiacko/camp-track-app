import FinanceAccountContentLine from '@/components/custom/finance/accounts/base/FinanceAccountContentLine';
import { FinanceAccountProps } from '@/types/finance';
import { getDenominations } from '@/utils/finance';
import { ScrollView } from 'react-native';

const FinanceAccountContent = ({ type }: FinanceAccountProps) => {
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