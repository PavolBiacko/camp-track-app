import CustomButton from '@/components/custom/CustomButton';
import { CustomModalProps } from '@/types/custom/modal';
import { PropsWithChildren, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import Loading from './Loading';

const CustomModal = (props: PropsWithChildren<CustomModalProps>) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitModal = async () => {
    if (props.handleConfirm) {
      setIsLoading(true);
      await props.handleConfirm();
      setIsLoading(false);
      props.setModalVisible(false);
    }
  };

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
        disabled={props.type === "confirmation" || props.type === "loading"}
        onPress={handleCloseModal}
        className="flex-1 justify-center items-center bg-background-0/50">
        <TouchableOpacity
          activeOpacity={1}
          disabled={props.type === "confirmation"}
          className={`bg-background-100 border-2 border-primary-500 rounded-xl p-6 ${props.containerStyles}`}>
          {props.title &&
            (<Text className="text-3xl font-pbold text-typography-900 text-center mb-4">
              {props.title}
            </Text>)}
          {props.subTitle &&
            (<Text className="text-xl font-pbold text-typography-600 text-center mb-4">
              {props.subTitle}
            </Text>)}
          {props.children}
          {props.type === "confirmation" && (
            <View className="flex-row justify-between gap-4 mt-4 h-20">
              <CustomButton
                title={props.baseButtonText || "Zrušiť"}
                action="error"
                variant="combined"
                handlePress={handleCloseModal}
                containerStyles="flex-1 rounded-xl py-3"
                textStyles="text-2xl"
                isDisabled={isLoading}
              />
              <CustomButton
                title={props.confirmButtonText || "Potvrdiť"}
                action="success"
                variant="combined"
                handlePress={handleSubmitModal}
                containerStyles="flex-1 rounded-xl py-3"
                textStyles="text-2xl"
                isLoading={isLoading}
                isDisabled={props.isSubmitDisabled}
              />
            </View>
          )}
          {props.type === "custom" && (
            <CustomButton
              title={props.baseButtonText || "Zrušiť"}
              action="background"
              variant="combined"
              handlePress={handleCloseModal}
              containerStyles="rounded-xl py-3 w-full mt-4"
              textStyles="text-2xl"
            />
          )}
          {props.type === "loading" && (
            <Loading showText={false} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

export default CustomModal