import { useFinanceBuffetContext } from '@/components/custom/context/FinanceBuffetContext';
import CustomModal from '@/components/custom/CustomModal';
import FinanceBuffetSummary from '@/components/custom/finance/buffet/FinanceBuffetSummary';
import { useUpdateManyAccountBalancesWithLeader } from '@/hooks/models/useChildren';
import { useCreateManyTransactions } from '@/hooks/models/useTransactions';
import { useAuth } from '@/hooks/useAuth';
import { TransactionType } from '@/types/enums/finance';
import { FinanceBuffetModalProps } from '@/types/finance';
import { formatISOLocalToHumanReadable } from '@/utils/dates';
import { getManyChildBalanceObjects, getManyTransactionObjectsOfType, getTotalAmount } from '@/utils/finance';
import { router } from 'expo-router';
import { Alert } from 'react-native';

const FinanceBuffetModal = ({ children, modalVisible, setModalVisible }: FinanceBuffetModalProps) => {
  const { user } = useAuth();
  const { actionAmounts, setActionAmounts } = useFinanceBuffetContext()
  const { createManyTransactions } = useCreateManyTransactions();
  const { updateManyAccountBalances } = useUpdateManyAccountBalancesWithLeader(user?.id!)  // id loaded in tabs layout

  const handleConfirm = async () => {
    try {
      const buffetTransactions = getManyTransactionObjectsOfType(children, actionAmounts, TransactionType.PURCHASE);
      const accountBalances = getManyChildBalanceObjects(children, actionAmounts);

      // Should be as atomic transaction in database
      await createManyTransactions(buffetTransactions);
      await updateManyAccountBalances(accountBalances);

      Alert.alert("Návšteva bufetu úspešná!", `Celková suma: ${getTotalAmount(actionAmounts)} €`);

    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    } finally {
      setActionAmounts({})
      router.back();
    }
  };

  return (
    <CustomModal
      title={`Súhrn za ${formatISOLocalToHumanReadable(new Date())}`}
      type="confirmation"
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      handleConfirm={handleConfirm}
      containerStyles='w-11/12 h-[90%]'>
      <FinanceBuffetSummary children={children} />
    </CustomModal>
  )
}

export default FinanceBuffetModal