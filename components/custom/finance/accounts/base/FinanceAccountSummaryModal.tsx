import { useFinanceAccountContext } from '@/components/custom/context/FinanceAccountContext';
import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext';
import CustomModal from '@/components/custom/CustomModal';
import FinanceAccountActionSummary from '@/components/custom/finance/accounts/base/FinanceAccountActionSummary';
import { useUpdateCashRegisterByLeader } from '@/hooks/models/useCashRegister';
import { useUpdateAccountBalanceWithLeader } from '@/hooks/models/useGroupAccounts';
import { useGroupBasicByLeader } from '@/hooks/models/useGroups';
import { useCreateTransaction } from '@/hooks/models/useTransactions';
import { FinanceAccountSummaryModalProps } from '@/types/finance';
import { addDecimals, multiplyDecimals } from '@/utils/decimal';
import { getTransactionDirection, getTransactionObject, getTransactionSuccessMessage, processCountsWithQuantities } from '@/utils/finance';
import { getTrasactionAlertButtons } from '@/utils/ui';
import { router } from 'expo-router';
import { Alert } from 'react-native';

const FinanceAccountSummaryModal = ({ childId, leaderId, modalVisible, setModalVisible }: FinanceAccountSummaryModalProps) => {
  const { quantities } = useFinanceOverviewContext();
  const { childAccountBalance, actionAmount, counts, resetDenominations, transactionType } = useFinanceAccountContext();

  const { groupBasic } = useGroupBasicByLeader(leaderId);
  const { updateCashRegister } = useUpdateCashRegisterByLeader(leaderId);
  const { createTransaction } = useCreateTransaction();
  const { updateAccountBalance } = useUpdateAccountBalanceWithLeader(childId, leaderId);

  const handleConfirmPaybackAlert = () => {
    // After buffet payout, there needs to be payback
    router.push({ pathname: "/(main)/(finance)/accounts/money-form", params: { leaderId, type: "increment" } })
  }

  const handleConfirm = async () => {
    try {
      const newBalance = addDecimals(childAccountBalance, multiplyDecimals(actionAmount, getTransactionDirection(transactionType)))
      const updatedCounts = processCountsWithQuantities(quantities, counts, transactionType);
      const transactionData = getTransactionObject(groupBasic?.id!, childId, actionAmount, transactionType);

      // Should be as atomic transaction in database
      await createTransaction(transactionData);
      await updateCashRegister(updatedCounts);
      await updateAccountBalance(newBalance);

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