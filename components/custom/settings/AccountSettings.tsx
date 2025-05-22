import CustomButton from '@/components/custom/CustomButton';
import CustomModal from '@/components/custom/CustomModal';
import Loading from '@/components/custom/Loading';
import SettingsBox from '@/components/custom/settings/base/SettingsBox';
import { getAccountActions } from '@/hooks/useAccountActions';
import { useAuth } from '@/hooks/useAuth';
import { CustomButtonProps } from '@/types/custom/button';
import { CustomModalProps } from '@/types/custom/modal';
import { useState } from 'react';
import { View } from 'react-native';

const AccountSettings = () => {
  const { user, isLoading, isError } = useAuth();
  const { handleLogout, handleAccountDelete } = getAccountActions();

  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [modalAccountDeleteVisible, setModalAccountDeleteVisible] = useState(false);

  const accountActionButtonsWithModals: { button: CustomButtonProps, modal: Omit<CustomModalProps, "type"> }[] = [
    {
      button: {
        title: 'Odhlás sa',
        action: 'primary',
        handlePress: () => setModalLogoutVisible(true),
        containerStyles: 'h-16 rounded-3xl',
      },
      modal: {
        title: 'Naozaj sa chceš odhlásiť?',
        modalVisible: modalLogoutVisible,
        setModalVisible: setModalLogoutVisible,
        handleConfirm: handleLogout,
      }
    },
    {
      button: {
        title: 'Odstráň účet',
        action: 'default',
        handlePress: () => setModalAccountDeleteVisible(true),
        containerStyles: 'w-48 h-12 rounded-3xl border-2 border-indicator-error bg-background-300 self-center',
        textStyles: 'text-indicator-error',
      },
      modal: {
        title: 'Naozaj chceš zmazať účet?',
        subTitle: 'Túto akciu už nie je možné vrátiť.',
        modalVisible: modalAccountDeleteVisible,
        setModalVisible: setModalAccountDeleteVisible,
        handleConfirm: () => handleAccountDelete(user?.id!),
      }
    },
  ];

  return (
    <SettingsBox title="Účet" isClickable={false}>
      {!user || isLoading || isError ? (
        <Loading showText={false} containerStyles='p-5' />
      ) : (
        <View className="p-5 gap-5">
          {accountActionButtonsWithModals.map((actionObject, index) => (
            <View key={index}>
              <CustomButton
                title={actionObject.button.title}
                action={actionObject.button.action}
                handlePress={actionObject.button.handlePress}
                containerStyles={actionObject.button.containerStyles}
                textStyles={actionObject.button.textStyles}
              />
              <CustomModal
                title={actionObject.modal.title}
                subTitle={actionObject.modal.subTitle}
                type="confirmation"
                modalVisible={actionObject.modal.modalVisible}
                setModalVisible={actionObject.modal.setModalVisible}
                handleConfirm={actionObject.modal.handleConfirm}
                containerStyles='w-11/12'
              />
            </View>
          ))}
        </View>
      )}
    </SettingsBox>
  )
}

export default AccountSettings