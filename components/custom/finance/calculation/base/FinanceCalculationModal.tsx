import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext';
import CustomModal from '@/components/custom/CustomModal';
import { useWithdrawalAction } from '@/hooks/models/useFinance';
import { FinanceCalculationModalProps } from '@/types/finance';
import { router } from 'expo-router';
import { Alert } from 'react-native';

const FinanceCalculationModal = ({ leaderId, children, modalVisible, setModalVisible }: FinanceCalculationModalProps) => {
  const { totalAmount } = useFinanceOverviewContext();
  const { withdrawalAction } = useWithdrawalAction();

  const handleConfirm = async () => {
    try {
      await withdrawalAction({ leaderId, totalAmount });
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