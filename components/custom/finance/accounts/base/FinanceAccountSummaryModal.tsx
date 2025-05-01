import { useFinanceAccountContext } from '@/components/custom/context/FinanceAccountContext';
import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext';
import CustomModal from '@/components/custom/CustomModal';
import FinanceAccountActionSummary from '@/components/custom/finance/accounts/base/FinanceAccountActionSummary';
import { useUpdateCashRegisterByLeader } from '@/hooks/models/useCashRegister';
import { useUpdateAccountBalanceWithLeader } from '@/hooks/models/useChildren';
import { useGroupBasicByLeader } from '@/hooks/models/useGroups';
import { useCreateTransaction } from '@/hooks/models/useTransactions';
import { TransactionType } from '@/types/enums/finance';
import { FinanceAccountSummaryModalProps } from '@/types/finance';
import { addDecimals } from '@/utils/decimal';
import { getTransactionDirection, getTransactionObject, processCountsWithQuantities } from '@/utils/finance';
import { router } from 'expo-router';
import { Alert } from 'react-native';

const FinanceAccountSummaryModal = ({ childId, leaderId, modalVisible, setModalVisible }: FinanceAccountSummaryModalProps) => {
  const { quantities } = useFinanceOverviewContext();
  const { childAccountBalance, actionAmount, counts, resetDenominations, type } = useFinanceAccountContext();

  const { groupBasic } = useGroupBasicByLeader(leaderId);
  const { updateCashRegister } = useUpdateCashRegisterByLeader(leaderId);
  const { createTransaction } = useCreateTransaction();
  const { updateAccountBalance } = useUpdateAccountBalanceWithLeader(childId, leaderId);

  const handleConfirm = async () => {
    try {
      const transactionType = (type === "increment") ? TransactionType.DEPOSIT : TransactionType.WITHDRAWAL;
      const newBalance = addDecimals(childAccountBalance, (actionAmount * getTransactionDirection(transactionType)))
      const updatedCounts = processCountsWithQuantities(quantities, counts, type);
      const transactionData = getTransactionObject(groupBasic?.id!, childId, actionAmount, transactionType);

      // Should be as atomic transaction in database
      await updateCashRegister(updatedCounts);
      await createTransaction(transactionData);
      await updateAccountBalance(newBalance);

      Alert.alert("Hotovo!", `${(transactionType === TransactionType.DEPOSIT) ? "Pridané" : "Vrátené"} peniaze : ${actionAmount} €.`);
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    } finally {
      resetDenominations(); // Reset denominations after updating
      setModalVisible(false);
      router.back();
    }
  };

  return (
    <CustomModal
      title="Súhrn akcie"
      type="confirmation"
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      handleConfirm={handleConfirm}
      containerStyles='w-11/12 h-[70%]'>
      <FinanceAccountActionSummary />
    </CustomModal>
  )
}

export default FinanceAccountSummaryModal