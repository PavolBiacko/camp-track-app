import CustomButton from '@/components/custom/CustomButton';
import { FinanceAccountActionModalProps } from '@/types/finance';
import { router } from 'expo-router';
import { Modal, Text, TouchableOpacity } from 'react-native';

const FinanceAccountActionModal = ({ childId, modalVisible, setModalVisible }: FinanceAccountActionModalProps) => {

  const handleOptionSelect = (type: 'increment' | 'decrement') => {
    setModalVisible(false);
    router.push({ pathname: "/(main)/(finance)/accounts/money-form", params: { childId, type } });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleCloseModal}
        className="flex-1 justify-center items-center bg-background-0/50">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => { }}
          className="bg-background-100 border-2 border-primary-500 rounded-xl w-3/4 p-6">
          <Text className="text-3xl font-pbold text-typography-800 text-center mb-4">
            Výber akcie
          </Text>
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
          <CustomButton
            title="Zrušiť"
            action="background"
            variant="combined"
            handlePress={handleCloseModal}
            containerStyles="rounded-xl py-3"
            textStyles="text-2xl"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

export default FinanceAccountActionModal