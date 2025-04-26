import FinanceTransactionContent from '@/components/custom/finance/transactions/FinanceTransactionContent'
import FinanceTransactionHeader from '@/components/custom/finance/transactions/FinanceTransactionHeader'
import { View } from 'react-native'

const Transactions = () => {
  return (
    <View className='flex-1'>
      <FinanceTransactionHeader />
      <FinanceTransactionContent />
    </View>
  )
}

export default Transactions