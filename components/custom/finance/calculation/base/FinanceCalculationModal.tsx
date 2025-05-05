import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext';
import CustomModal from '@/components/custom/CustomModal';
import { useUpdateCashRegisterByLeader } from '@/hooks/models/useCashRegister';
import { useUpdateManyAccountBalancesWithLeader } from '@/hooks/models/useGroupAccounts';
import { useGroupBasicByLeader } from '@/hooks/models/useGroups';
import { useCreateTransaction } from '@/hooks/models/useTransactions';
import { TransactionType } from '@/types/enums/finance';
import { FinanceCalculationModalProps } from '@/types/finance';
import { getEmptyAccountBalances, getEmptyCashRegister, getTransactionObject } from '@/utils/finance';
import { router } from 'expo-router';
import { Alert } from 'react-native';

const FinanceCalculationModal = ({ leaderId, children, modalVisible, setModalVisible }: FinanceCalculationModalProps) => {
  const { totalAmount } = useFinanceOverviewContext();

  const { groupBasic } = useGroupBasicByLeader(leaderId);
  const { updateCashRegister } = useUpdateCashRegisterByLeader(leaderId);
  const { updateManyAccountBalances } = useUpdateManyAccountBalancesWithLeader(leaderId);
  const { createTransaction } = useCreateTransaction();

  const handleConfirm = async () => {
    try {
      const accountBalances = getEmptyAccountBalances(children);
      const cashRegisterRecord = getEmptyCashRegister();
      const transactionData = getTransactionObject(groupBasic?.id!, null, totalAmount, TransactionType.WITHDRAWAL);

      // Should be as atomic transaction in database
      await createTransaction(transactionData);
      await updateCashRegister(cashRegisterRecord);
      await updateManyAccountBalances(accountBalances);

      Alert.alert("Hotovo!", "Peniaze úspešne rozmenené.");
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    } finally {
      setModalVisible(false);
      router.back();
    }
  }

  return (
    <CustomModal
      title="Chceš rozmeniť všetkým peniaze?"
      subTitle="Akcia je nezvrzatná."
      type="confirmation"
      isSubmitDisabled={children.length === 0}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      handleConfirm={handleConfirm}
      containerStyles='w-11/12'>
    </CustomModal>
  )
}

export default FinanceCalculationModal