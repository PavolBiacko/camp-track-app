import CustomButton from '@/components/CustomButton';
import { supabase } from '@/services/supabaseClient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {

  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Pozor!", error.message);
      return;
    }
    setIsLoading(false);
    router.replace("/welcome");
  };
  return (
    <SafeAreaView>
      <CustomButton
        title="Odhlás sa"
        handlePress={logout}
        isPrimary={true}
        iconStyles="w-8 h-8"
        containerStyles="w-full mt-5"
        isLoading={isLoading}
      />
    </SafeAreaView>
  )
}

export default Home