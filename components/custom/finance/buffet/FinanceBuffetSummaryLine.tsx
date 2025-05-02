import { Gender } from '@/types/enums/gender'
import { FinanceBuffetSummaryLineProps } from '@/types/finance'
import { subtractDecimals } from '@/utils/decimal'
import { Text, View } from 'react-native'

const FinanceBuffetSummaryLine = ({ child, actionAmount }: FinanceBuffetSummaryLineProps) => {
  return (
    <View className="justify-center items-center bg-background-500 border border-outline-500 rounded-xl w-11/12 my-3">
      <Text className="text-typography-950 text-2xl font-pbold py-1 mt-1">
        {child.firstName} {child.lastName}
      </Text>
      <View className="justify-center items-center border-t border-outline-500 w-full py-1">
        <Text className="text-error-500 text-xl font-pbold underline">
          {child.gender === Gender.MALE ? "Zaplatil" : "Zaplatila"}: {actionAmount.toFixed(2)} €
        </Text>
        <Text className="text-success-400 text-xl font-pbold">
          Zostatok: {subtractDecimals(child.accountBalance, actionAmount).toFixed(2)} €
        </Text>
      </View>
    </View>
  )
}

export default FinanceBuffetSummaryLine