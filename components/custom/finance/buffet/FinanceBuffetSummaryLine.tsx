import { FinanceBuffetSummaryLineProps } from '@/types/finance'
import { Text, View } from 'react-native'

const FinanceBuffetSummaryLine = ({ child, actionAmount }: FinanceBuffetSummaryLineProps) => {
  return (
    <View
      className="justify-center items-center bg-background-500 border border-outline-500 rounded-xl w-11/12 py-2 my-3">
      <Text className="text-typography-950 text-2xl font-pbold mt-1">
        {child.firstName} {child.lastName}
      </Text>
      <View className="items-center border-2 border-secondary-500 rounded-xl p-2">
        <View className='flex-row items-center gap-2 border-b-2 border-outline-500'>
          <Text className="text-tertiary-500 text-xl font-pbold mt-1">
            {child.accountBalance.toFixed(2)} €
          </Text>
          <Text className="text-typography-950 text-2xl font-pbold mt-1">-</Text>
          <Text className="text-error-500 text-xl font-pbold mt-1">
            {actionAmount.toFixed(2)} €
          </Text>
        </View>
        <Text className="text-primary-500 text-2xl font-pbold mt-1">
          {(child.accountBalance - actionAmount).toFixed(2)} €
        </Text>
      </View>
    </View>
  )
}

export default FinanceBuffetSummaryLine