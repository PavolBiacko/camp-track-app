import FinanceOverviewContent from '@/components/custom/finance/overview/FinanceOverviewContent'
import FinanceOverviewFooter from '@/components/custom/finance/overview/FinanceOverviewFooter'
import FinanceOverviewHeader from '@/components/custom/finance/overview/FinanceOverviewHeader'
import { View } from 'react-native'

const Overview = () => {
  return (
    <View className='flex-1'>
      <FinanceOverviewHeader />
      <FinanceOverviewContent />
      <FinanceOverviewFooter />
    </View>
  )
}

export default Overview