import FinanceOverviewLine from '@/components/custom/finance/overview/base/FinanceOverviewLine'
import { Denominations } from '@/types/enums/finance'
import { View } from 'react-native'

const FinanceOverviewContent = () => {
  return (
    <View className='flex-1 flex-row'>
      <View className='w-[45%] gap-5 border-r border-outline-300 justify-center pl-3'>
        <FinanceOverviewLine denomination={Denominations.CENTS_1} />
        <FinanceOverviewLine denomination={Denominations.CENTS_2} />
        <FinanceOverviewLine denomination={Denominations.CENTS_5} />
        <FinanceOverviewLine denomination={Denominations.CENTS_10} />
        <FinanceOverviewLine denomination={Denominations.CENTS_20} />
        <FinanceOverviewLine denomination={Denominations.CENTS_50} />
        <FinanceOverviewLine denomination={Denominations.EURO_1} />
        <FinanceOverviewLine denomination={Denominations.EURO_2} />
      </View>
      <View className='w-[55%] gap-6 justify-center pl-3'>
        <FinanceOverviewLine denomination={Denominations.EURO_5} />
        <FinanceOverviewLine denomination={Denominations.EURO_10} />
        <FinanceOverviewLine denomination={Denominations.EURO_20} />
        <FinanceOverviewLine denomination={Denominations.EURO_50} />
        <FinanceOverviewLine denomination={Denominations.EURO_100} />
        <FinanceOverviewLine denomination={Denominations.EURO_200} />
        <FinanceOverviewLine denomination={Denominations.EURO_500} />
      </View>
    </View>
  )
}

export default FinanceOverviewContent