import { FinanceCalculationExchangeLineProps } from '@/types/finance'
import { getMoneyImage, getMoneyType } from '@/utils/finance'
import { Image, Text, View } from 'react-native'

const FinanceCalculationExchangeLine = ({ denomination, count }: FinanceCalculationExchangeLineProps) => {
  return (
    <View className='flex-row items-center gap-2'>
      <Text className='text-typography-950 text-3xl font-pextrabold mt-2'>{count} ×</Text>
      <Image
        source={getMoneyImage(denomination)}
        resizeMode='contain'
        className={`${getMoneyType(denomination) === "bill" ? "w-24 h-14" : "w-14 h-14"}`} />
    </View>
  )
}

export default FinanceCalculationExchangeLine