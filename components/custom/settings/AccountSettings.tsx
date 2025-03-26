import CustomButton from '@/components/custom/CustomButton';
import SettingsBox from '@/components/custom/settings/base/SettingsBox';
import authRepository from '@/repositories/authRepository';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

const AccountSettings = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [accountDeleteLoading, setAccountDeleteLoading] = useState(false);

  const handleAccountDelete = async () => {
    try {
      setAccountDeleteLoading(true);
      await authRepository.deleteAccount()
      // router.dismissAll();
      // router.replace("/welcome");
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    } finally {
      setAccountDeleteLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await authRepository.logout()
      router.dismissAll();
      router.replace("/welcome");
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <SettingsBox title="Účet" isClickable={false} containerStyles='p-5 gap-5'>
      <CustomButton
        title="Zmena emailu"
        action="secondary"
        handlePress={() => { }}
        containerStyles='h-16 rounded-3xl'
      />
      <CustomButton
        title="Zmena hesla"
        action="tertiary"
        handlePress={() => { }}
        containerStyles='h-16 rounded-3xl'
      />
      <CustomButton
        title="Odhlás sa"
        handlePress={handleLogout}
        action="primary"
        containerStyles='h-16 rounded-3xl'
        isLoading={logoutLoading}
      />
      <CustomButton
        title="Odstráň účet"
        action='default'
        handlePress={handleAccountDelete}
        textStyles='text-indicator-error'
        containerStyles='w-48 h-12 rounded-3xl border-2 border-indicator-error bg-background-300 self-center'
        isLoading={accountDeleteLoading}
      />

    </SettingsBox>
  )
}

export default AccountSettings