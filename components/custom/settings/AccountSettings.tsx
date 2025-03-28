import CustomButton from '@/components/custom/CustomButton';
import Loading from '@/components/custom/Loading';
import SettingsBox from '@/components/custom/settings/base/SettingsBox';
import { useAccountActions } from '@/hooks/useAccountActions';
import { useAuth } from '@/hooks/useAuth';
import { CustomButtonProps } from '@/types/button';
import { View } from 'react-native';

const AccountSettings = () => {
  const { user, isLoading, isError } = useAuth();
  const { logoutLoading, accountDeleteLoading, handleLogout, handleAccountDelete } = useAccountActions();

  const accountSettingsButtons: CustomButtonProps[] = [
    {
      title: 'Zmena emailu',
      action: 'secondary',
      handlePress: () => { },
      containerStyles: 'h-16 rounded-3xl',
    },
    {
      title: 'Zmena hesla',
      action: 'tertiary',
      handlePress: () => { },
      containerStyles: 'h-16 rounded-3xl',
    },
  ];

  const accountActionButtons: CustomButtonProps[] = [
    {
      title: 'Odhlás sa',
      action: 'primary',
      handlePress: handleLogout,
      containerStyles: 'h-16 rounded-3xl',
      isLoading: logoutLoading,
    },
    {
      title: 'Odstráň účet',
      action: 'default',
      handlePress: () => handleAccountDelete(user?.id!),  // button is disabled if user is not loaded
      containerStyles: 'w-48 h-12 rounded-3xl border-2 border-indicator-error bg-background-300 self-center',
      textStyles: 'text-indicator-error',
      isLoading: accountDeleteLoading,
    },
  ];

  return (
    <SettingsBox title="Účet" isClickable={false}>
      {!user || isLoading || isError ? (
        <Loading showText={false} containerStyles='p-5' />
      ) : (
        <>
          <View className="border-b border-outline-500 p-5 gap-5">
            {accountSettingsButtons.map((button, index) => (
              <CustomButton
                key={index}
                title={button.title}
                action={button.action}
                handlePress={button.handlePress}
                containerStyles={button.containerStyles}
                textStyles={button.textStyles}
                isLoading={button.isLoading}
              />
            ))}
          </View>
          <View className="p-5 gap-5">
            {accountActionButtons.map((button, index) => (
              <CustomButton
                key={index}
                title={button.title}
                action={button.action}
                handlePress={button.handlePress}
                containerStyles={button.containerStyles}
                textStyles={button.textStyles}
                isLoading={button.isLoading}
              />
            ))}
          </View>
        </>
      )}
    </SettingsBox>
  )
}

export default AccountSettings