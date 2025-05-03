import { TransactionType } from '@/types/enums/finance'
import { FinanceTransactionLineTextProps } from '@/types/finance'
import { Text, View } from 'react-native'

const FinanceTransactionLineText = ({ child, type }: FinanceTransactionLineTextProps) => {
  return (
    <>
      {child
        ? (
          <View>
            <Text className="text-typography-900 font-pbold text-2xl pt-1">{child.firstName}</Text>
            <Text className="text-typography-900 font-pbold text-2xl pt-1">{child.lastName}</Text>
          </View>
        )
        : (
          <>
            {type === TransactionType.PAYOUT || type === TransactionType.PAYBACK
              ? (
                <View>
                  <Text className="text-primary-500 font-pbold text-2xl pt-1">AKCIA</Text>
                  <Text className="text-primary-500 font-pbold text-2xl pt-1">BUFETU</Text>
                </View>
              ) : (
                <View>
                  <Text className="text-primary-500 font-pbold text-2xl pt-1">CELKOVÉ</Text>
                  <Text className="text-primary-500 font-pbold text-2xl pt-1">VYROVNANIE</Text>
                </View>
              )
            }
          </>
        )}
    </>
  )
}

export default FinanceTransactionLineText