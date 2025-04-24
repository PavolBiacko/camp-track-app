import CustomModal from '@/components/custom/CustomModal';
import FinanceAccountActionSummary from '@/components/custom/finance/accounts/base/FinanceAccountActionSummary';
import { FinanceAccountSummaryModalProps } from '@/types/finance';
import { router } from 'expo-router';

const FinanceAccountSummaryModal = ({ type, childId, modalVisible, setModalVisible }: FinanceAccountSummaryModalProps) => {

  const handleConfirm = (type: 'increment' | 'decrement') => {
    setModalVisible(false);
    router.push({ pathname: "/(main)/(finance)/accounts/money-form", params: { childId, type } });
  };

  return (
    <CustomModal
      title="Súhrn akcie"
      type="confirmation"
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      containerStyles='w-11/12 h-2/3'>
      <FinanceAccountActionSummary type={type} />
    </CustomModal>
  )
}

export default FinanceAccountSummaryModal