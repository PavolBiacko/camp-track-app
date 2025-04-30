import { useFinanceBuffetContext } from '@/components/custom/context/FinanceBuffetContext';
import FinanceBuffetSummaryLine from '@/components/custom/finance/buffet/FinanceBuffetSummaryLine';
import { FinanceBuffetSummaryProps } from '@/types/finance';
import { getTotalAmount } from '@/utils/finance';
import { ScrollView, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

const FinanceBuffetSummary = ({ children }: FinanceBuffetSummaryProps) => {
  const { actionAmounts } = useFinanceBuffetContext()
  const totalAmount = getTotalAmount(actionAmounts)

  return (
    <>
      <View className={
        twMerge(
          'justify-center items-center w-full mb-5 py-1',
          'border-2 border-outline-500 rounded-xl bg-background-300'
        )}>
        <Text className="text-secondary-500 text-4xl font-pbold mt-3">
          {totalAmount.toFixed(2)} €
        </Text>
      </View>
      <View className='flex-1 w-full border-2 border-outline-500 rounded-xl bg-background-300'>
        <ScrollView
          contentContainerClassName="items-center py-2"
          nestedScrollEnabled={true}>
          {children.map((child, index) => (
            <FinanceBuffetSummaryLine
              key={index}
              child={child}
              actionAmount={actionAmounts[child.id] || 0}
            />
          ))}
        </ScrollView>
      </View>
    </>
  )
}

export default FinanceBuffetSummary