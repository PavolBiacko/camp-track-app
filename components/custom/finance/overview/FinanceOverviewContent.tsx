import FinanceOverviewLine from '@/components/custom/finance/overview/base/FinanceOverviewLine';
import { getBills, getCoins } from '@/utils/finance';
import { View } from 'react-native';

const FinanceOverviewContent = () => {
  const coins = getCoins();
  const bills = getBills();

  return (
    <View className='flex-1 flex-row'>
      <View className='w-[45%] gap-5 border-r border-outline-300 justify-center pl-3'>
        {coins.map((denomination) => (
          <FinanceOverviewLine key={denomination} denomination={denomination} />
        ))}
      </View>
      <View className='w-[55%] gap-6 justify-center pl-3'>
        {bills.map((denomination) => (
          <FinanceOverviewLine key={denomination} denomination={denomination} />
        ))}
      </View>
    </View>
  )
}

export default FinanceOverviewContent