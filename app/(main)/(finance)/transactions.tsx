import { FinanceTransactionProvider } from '@/components/custom/context/FinanceTransactionContext'
import FinanceTransactionContent from '@/components/custom/finance/transactions/FinanceTransactionContent'
import FinanceTransactionHeader from '@/components/custom/finance/transactions/FinanceTransactionHeader'
import { View } from 'react-native'

const Transactions = () => {
  return (
    <View className='flex-1'>
      <FinanceTransactionProvider>
        <FinanceTransactionHeader />
        <FinanceTransactionContent />
      </FinanceTransactionProvider>
    </View>
  )
}

export default Transactions