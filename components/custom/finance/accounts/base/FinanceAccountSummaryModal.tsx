import { useFinanceAccountContext } from '@/components/custom/context/FinanceAccountContext';
import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext';
import CustomModal from '@/components/custom/CustomModal';
import FinanceAccountActionSummary from '@/components/custom/finance/accounts/base/FinanceAccountActionSummary';
import { useCreateTransaction, useUpdateAccountBalance, useUpdateCashRegisterByChild } from '@/hooks/models/useFinance';
import { FinanceAccountSummaryModalProps } from '@/types/finance';
import { getTransactionObject, processCountsWithQuantities } from '@/utils/finance';
import { router } from 'expo-router';
import { Alert } from 'react-native';

const FinanceAccountSummaryModal = ({ type, childId, modalVisible, setModalVisible }: FinanceAccountSummaryModalProps) => {
  const { quantities } = useFinanceOverviewContext();
  const { childAccountBalance, actionAmount, counts, resetDenominations } = useFinanceAccountContext();

  const { updateAccountBalance } = useUpdateAccountBalance(childId);
  const { updateCashRegister } = useUpdateCashRegisterByChild(childId);
  const { createTransaction } = useCreateTransaction();

  const handleConfirm = async () => {
    try {
      const newBalance = (type === "increment") ? childAccountBalance + actionAmount : childAccountBalance - actionAmount;
      const updatedCounts = processCountsWithQuantities(type, quantities, counts);
      const transactionData = getTransactionObject(childId, type, actionAmount);

      // Should be as atomic transaction in database
      await updateAccountBalance(newBalance);
      await updateCashRegister(updatedCounts);
      await createTransaction(transactionData)
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
      containerStyles='w-11/12 h-2/3'>
      <FinanceAccountActionSummary type={type} />
    </CustomModal>
  )
}

export default FinanceAccountSummaryModal