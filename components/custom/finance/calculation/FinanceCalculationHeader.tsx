import FinanceCalculationExchangeLine from '@/components/custom/finance/calculation/base/FinanceCalculationExchangeLine'
import { ArrowLeftIcon, ArrowRightIcon, Icon } from '@/components/ui/icon'
import { Denominations } from '@/types/enums/finance'
import { FinanceCalculationHeaderProps } from '@/types/finance'
import { ScrollView, Text, View } from 'react-native'

const FinanceCalculationHeader = ({ exchange }: FinanceCalculationHeaderProps) => {
  return (
    <View className='h-1/5'>
      <View className='flex-row justify-center items-center bg-background-300 border-y border-outline-300 gap-5 py-2'>
        <Icon as={ArrowLeftIcon} size='sm' />
        <Text className='text-typography-950 text-2xl text-center font-pbold'>
          Treba rozmeniť
        </Text>
        <Icon as={ArrowRightIcon} size='sm' />
      </View>
      <ScrollView horizontal={true} contentContainerClassName="items-center gap-5">
        <View className='flex-row h-full items-center justify-center gap-8 border-r border-outline-500 px-5'>
          <FinanceCalculationExchangeLine exchange={exchange} denomination={Denominations.EURO_100} side='from' />
        </View>
        <Icon as={ArrowRightIcon} size='xl' className="w-8 h-8" />
        <View className='flex-row h-full items-center justify-center gap-8 border-l border-outline-500 px-5'>
          <FinanceCalculationExchangeLine exchange={exchange} denomination={Denominations.EURO_50} side='to' />
          <FinanceCalculationExchangeLine exchange={exchange} denomination={Denominations.EURO_20} side='to' />
          <FinanceCalculationExchangeLine exchange={exchange} denomination={Denominations.EURO_10} side='to' />
        </View>
      </ScrollView>
    </View>
  )
}

export default FinanceCalculationHeader