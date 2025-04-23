import CustomButton from '@/components/custom/CustomButton';
import CustomModal from '@/components/custom/CustomModal';
import { FinanceAccountActionModalProps } from '@/types/finance';
import { router } from 'expo-router';

const FinanceAccountSummaryModal = ({ childId, modalVisible, setModalVisible }: FinanceAccountActionModalProps) => {

  const handleOptionSelect = (type: 'increment' | 'decrement') => {
    setModalVisible(false);
    router.push({ pathname: "/(main)/(finance)/accounts/money-form", params: { childId, type } });
  };

  return (
    <CustomModal
      title="Výber akcie"
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      containerStyles='w-11/12'>
      <CustomButton
        title="Pridanie peňazí"
        action="success"
        variant="solid"
        handlePress={() => handleOptionSelect('increment')}
        containerStyles="rounded-xl py-3 mb-3"
        textStyles="text-2xl"
      />
      <CustomButton
        title="Vrátenie peňazí"
        action="error"
        variant="solid"
        handlePress={() => handleOptionSelect('decrement')}
        containerStyles="rounded-xl py-3 mb-3"
        textStyles="text-2xl"
      />
    </CustomModal>
  )
}

export default FinanceAccountSummaryModal