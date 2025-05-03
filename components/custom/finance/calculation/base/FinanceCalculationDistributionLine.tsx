import { ArrowRightIcon, Icon } from '@/components/ui/icon'
import { Denominations } from '@/types/enums/finance'
import { FinanceCalculationDistributionLineProps } from '@/types/finance'
import { getMoneyImage, getMoneyType } from '@/utils/finance'
import { Image, Text, View } from 'react-native'

const FinanceCalculationDistributionLine = ({ count, denomString }: FinanceCalculationDistributionLineProps) => {
  return (
    <View className='flex-row w-full items-center justify-between'>
      <View className='w-[45%] items-center'>
        <Text className='text-typography-950 text-3xl font-psemibold mt-2'>
          {count} ×
        </Text>
      </View>
      <View className='items-center'>
        <Icon as={ArrowRightIcon} size='xl' />
      </View>
      <View className='w-[45%] items-center'>
        <Image
          source={getMoneyImage(parseFloat(denomString) as unknown as Denominations)}
          resizeMode='contain'
          className={`${getMoneyType(parseFloat(denomString) as Denominations) === "bill" ? "w-24 h-14" : "w-14 h-14"}`}
        />
      </View>
    </View>
  )
}

export default FinanceCalculationDistributionLine