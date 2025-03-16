import CustomButton from '@/components/CustomButton';
import authRepository from '@/repositories/authRepository';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {

  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    try {
      setIsLoading(true);
      await authRepository.logout()
      router.replace("/welcome");
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <CustomButton
        title="Odhlás sa"
        handlePress={submit}
        isPrimary={true}
        iconStyles="w-8 h-8"
        containerStyles="w-full mt-5"
        isLoading={isLoading}
      />
    </SafeAreaView>
  )
}

export default Home