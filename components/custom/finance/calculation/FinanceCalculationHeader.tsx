import FinanceCalculationExchangeLine from '@/components/custom/finance/calculation/base/FinanceCalculationExchangeLine'
import { ArrowLeftIcon, ArrowRightIcon, Icon } from '@/components/ui/icon'
import { FinanceCalculationHeaderProps } from '@/types/finance'
import { ScrollView, Text, View } from 'react-native'

const FinanceCalculationHeader = ({ exchanges }: FinanceCalculationHeaderProps) => {
  return (
    <View className='h-[20%]'>
      <View className='flex-row justify-center items-center bg-background-300 border-y-2 border-outline-500 gap-5 py-2'>
        <Icon as={ArrowLeftIcon} size='sm' />
        <Text className='text-typography-950 text-2xl text-center font-pbold'>
          Potrebné rozmeniť
        </Text>
        <Icon as={ArrowRightIcon} size='sm' />
      </View>
      {Object.keys(exchanges.from).length !== 0 || Object.keys(exchanges.to).length !== 0
        ? <ScrollView horizontal={true} contentContainerClassName="items-center gap-5">
          <View className='flex-row h-full items-center justify-center gap-8 border-x border-outline-500 px-5'>
            {Object.entries(exchanges.from)
              .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
              .map(([denomString, count], index) => (
                <FinanceCalculationExchangeLine
                  key={index}
                  count={count}
                  denomination={parseFloat(denomString)}
                />
              ))}
          </View>
          <Icon as={ArrowRightIcon} size='xl' className="w-8 h-8" />
          <View className='flex-row h-full items-center justify-center gap-8 border-x border-outline-500 px-5'>
            {Object.entries(exchanges.to)
              .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
              .map(([denomString, count], index) => (
                <FinanceCalculationExchangeLine
                  key={index}
                  count={count}
                  denomination={parseFloat(denomString)}
                />
              ))}
          </View>
        </ScrollView>
        : (
          <View className='flex-1 justify-center items-center'>
            <Text className='text-typography-950 text-3xl text-center font-psemibold mt-2'>
              Nie je čo rozmeniť
            </Text>
          </View>
        )}
    </View>
  )
}

export default FinanceCalculationHeader