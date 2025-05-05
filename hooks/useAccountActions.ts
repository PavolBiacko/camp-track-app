import { authRepository } from '@/repositories/authRepository';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export const getAccountActions = () => {

  const handleLogout = async () => {
    try {
      await authRepository.logout();
      router.dismissAll();
      router.replace("/(auth)");
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
    }
  };

  const handleAccountDelete = async (userId: string) => {
    try {
      await authRepository.deleteAccount(userId);
      router.dismissAll();
      router.replace("/(auth)");
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
    }
  };

  return {
    handleLogout,
    handleAccountDelete,
  };
};