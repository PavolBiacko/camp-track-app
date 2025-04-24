import { useFinanceAccountContext } from '@/components/custom/context/FinanceAccountContext';
import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext';
import CustomModal from '@/components/custom/CustomModal';
import FinanceAccountActionSummary from '@/components/custom/finance/accounts/base/FinanceAccountActionSummary';
import { useUpdateAccountBalance, useUpdateCashRegisterByChild } from '@/hooks/models/useFinance';
import { FinanceAccountSummaryModalProps } from '@/types/finance';
import { processCountsWithQuantities } from '@/utils/finance';
import { router } from 'expo-router';
import { Alert } from 'react-native';

const FinanceAccountSummaryModal = ({ type, childId, modalVisible, setModalVisible }: FinanceAccountSummaryModalProps) => {
  const { quantities } = useFinanceOverviewContext();
  const { childAccountBalance, actionAmount, counts, resetDenominations } = useFinanceAccountContext();

  const { updateAccountBalance } = useUpdateAccountBalance(childId);
  const { updateCashRegister } = useUpdateCashRegisterByChild(childId);

  const handleConfirm = async () => {
    try {
      const newBalance = (type === "increment") ? childAccountBalance + actionAmount : childAccountBalance - actionAmount;
      await updateAccountBalance(newBalance);
      const updatedCounts = processCountsWithQuantities(type, quantities, counts);
      await updateCashRegister(updatedCounts);
      router.back();
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    } finally {
      resetDenominations(); // Reset denominations after updating
      setModalVisible(false);
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