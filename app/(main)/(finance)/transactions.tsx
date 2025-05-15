import { FinanceTransactionProvider } from '@/components/custom/context/FinanceTransactionContext'
import FinanceTransactionContent from '@/components/custom/finance/transactions/FinanceTransactionContent'
import FinanceTransactionHeader from '@/components/custom/finance/transactions/FinanceTransactionHeader'
import Loading from '@/components/custom/Loading'
import { useCurrentCampSession } from '@/hooks/models/useCampSessions'
import { View } from 'react-native'

const Transactions = () => {
  const { currentCampSession, isLoading, isError } = useCurrentCampSession();

  if (!currentCampSession || isLoading || isError) {
    return <Loading showText={true} />
  }

  return (
    <View className='flex-1'>
      <FinanceTransactionProvider currentCampSession={currentCampSession}>
        <FinanceTransactionHeader />
        <FinanceTransactionContent />
      </FinanceTransactionProvider>
    </View>
  )
}

export default Transactions