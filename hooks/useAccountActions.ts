import { authRepository } from '@/repositories/authRepository';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useAccountActions = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [accountDeleteLoading, setAccountDeleteLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await authRepository.logout();
      router.dismissAll();
      router.replace("/(auth)");
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleAccountDelete = async (userId: string) => {
    try {
      setAccountDeleteLoading(true);
      await authRepository.deleteAccount(userId);
      router.dismissAll();
      router.replace("/(auth)");
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
    } finally {
      setAccountDeleteLoading(false);
    }
  };

  return {
    logoutLoading,
    accountDeleteLoading,
    handleLogout,
    handleAccountDelete,
  };
};