import CustomButton from '@/components/custom/CustomButton';
import { CustomModalProps } from '@/types/custom/modal';
import { PropsWithChildren } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

const CustomModal = (props: PropsWithChildren<CustomModalProps>) => {

  const handleCloseModal = () => {
    props.setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={handleCloseModal}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleCloseModal}
        className="flex-1 justify-center items-center bg-background-0/50">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => { }}
          className={`bg-background-100 border-2 border-primary-500 rounded-xl p-6 ${props.containerStyles}`}>
          {props.title && <Text className="text-3xl font-pbold text-typography-800 text-center mb-4">
            {props.title}
          </Text>}
          {props.children}
          {props.type === "confirmation" ? (
            <View className="flex-row justify-between gap-4 mt-4">
              <CustomButton
                title="Zrušiť"
                action="background"
                variant="combined"
                handlePress={handleCloseModal}
                containerStyles="rounded-xl py-3 flex-1"
                textStyles="text-2xl"
              />
              <CustomButton
                title="Potvrdiť"
                action="success"
                variant="combined"
                handlePress={props.handleConfirm!}
                containerStyles="rounded-xl py-3 flex-1"
                textStyles="text-2xl"
              />
            </View>
          ) : (
            <CustomButton
              title="Zrušiť"
              action="background"
              variant="combined"
              handlePress={handleCloseModal}
              containerStyles="rounded-xl py-3 w-full"
              textStyles="text-2xl"
            />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

export default CustomModal