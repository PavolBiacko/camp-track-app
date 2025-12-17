import { useFinanceAccountContext } from '@/components/custom/context/FinanceAccountContext';
import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext';
import CustomModal from '@/components/custom/CustomModal';
import FinanceAccountActionSummary from '@/components/custom/finance/accounts/base/FinanceAccountActionSummary';
import { useSingleCashAction } from '@/hooks/models/useFinance';
import { FinanceAccountSummaryModalProps } from '@/types/finance';
import { addDecimals, multiplyDecimals } from '@/utils/decimal';
import { getTransactionDirection, getTransactionSuccessMessage, processCountsWithQuantities } from '@/utils/finance';
import { getTrasactionAlertButtons } from '@/utils/ui';
import { router } from 'expo-router';
import { Alert } from 'react-native';

const FinanceAccountSummaryModal = ({ childId, leaderId, modalVisible, setModalVisible }: FinanceAccountSummaryModalProps) => {
  const { quantities } = useFinanceOverviewContext();
  const { childAccountBalance, actionAmount, counts, resetDenominations, transactionType } = useFinanceAccountContext();
  const { singleCashAction } = useSingleCashAction();

  const handleConfirmPaybackAlert = () => {
    // After buffet payout, there needs to be payback
    router.push({ pathname: "/(main)/(finance)/accounts/money-form", params: { leaderId, type: "increment" } })
  }

  const handleConfirm = async () => {
    try {
      const transactionAmount = multiplyDecimals(actionAmount, getTransactionDirection(transactionType))
      const newBalance = addDecimals(childAccountBalance, transactionAmount)
      const updatedCounts = processCountsWithQuantities(quantities, counts, transactionType);

      await singleCashAction({
        leaderId,
        childId,
        transactionAmount,
        transactionType,
        denominationsUpdates: updatedCounts,
      });

      Alert.alert(
        "Hotovo!",
        getTransactionSuccessMessage(transactionType, actionAmount),
        getTrasactionAlertButtons(transactionType, newBalance, handleConfirmPaybackAlert)
      );
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