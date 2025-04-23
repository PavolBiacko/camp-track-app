import CustomButton from '@/components/custom/CustomButton';
import { CustomModalProps } from '@/types/custom/modal';
import { PropsWithChildren } from 'react';
import { Modal, Text, TouchableOpacity } from 'react-native';

const CustomModal = ({ title, modalVisible, setModalVisible, containerStyles, children }: PropsWithChildren<CustomModalProps>) => {
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
          className={`bg-background-100 border-2 border-primary-500 rounded-xl p-6 ${containerStyles}`}>
          {title && <Text className="text-3xl font-pbold text-typography-800 text-center mb-4">
            {title}
          </Text>}
          {children}
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

export default CustomModal