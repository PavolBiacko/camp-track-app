import CustomButton from '@/components/custom/CustomButton';
import Loading from '@/components/custom/Loading';
import SettingsBox from '@/components/custom/settings/base/SettingsBox';
import { useAuth } from '@/hooks/useAuth';
import authRepository from '@/repositories/authRepository';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, View } from 'react-native';

const AccountSettings = () => {
  const { user, isLoading, isError } = useAuth();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [accountDeleteLoading, setAccountDeleteLoading] = useState(false);

  if (!user || isLoading || isError) {
    return <Loading />;
  }

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

  const handleAccountDelete = async () => {
    try {
      setAccountDeleteLoading(true);
      await authRepository.deleteAccount(user.id)
      router.dismissAll();
      router.replace("/welcome");
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    } finally {
      setAccountDeleteLoading(false);
    }
  };

  return (
    <SettingsBox title="Účet" isClickable={false}>
      <View className='border-b border-outline-500 p-5 gap-5'>
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
      </View>
      <View className='p-5 gap-5'>
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
      </View>


    </SettingsBox>
  )
}

export default AccountSettings