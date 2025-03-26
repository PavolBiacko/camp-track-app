import CustomButton from '@/components/custom/CustomButton';
import AppearanceSettings from '@/components/custom/settings/AppearanceSettings';
import SettingsBox from '@/components/custom/settings/base/SettingsBox';
import NotificationsSettings from '@/components/custom/settings/NotificationsSettings';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Badge, BadgeText } from '@/components/ui/badge';
import authRepository from '@/repositories/authRepository';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Settings = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    try {
      setIsLoading(true);
      await authRepository.logout()
      router.dismissAll();
      router.replace("/welcome");
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className='bg-background-0 w-full h-full'>
      <ScrollView>
        {/* Profile Settings */}
        <SettingsBox title="Profil" isClickable={true} containerStyles='bg-secondary-50 p-5'>
          <View className='flex-row justify-start items-center'>
            <Avatar size="xl" className="border-2 border-outline-700 bg-background-500 rounded-full">
              <AvatarFallbackText className="text-white">
                Pavol Biačko
              </AvatarFallbackText>
            </Avatar>
            <View className='ml-3'>
              <Text className='text-typography-950 text-2xl font-psemibold'>Pavol Biačko</Text>
              <Text className='text-typography-700 text-xs font-pregular'>palko.biacko@gmail.com</Text>
              <Badge className='bg-error-300 border border-error-700 justify-center items-center self-start rounded-xl mt-2'>
                <BadgeText className='text-typography-950 text-xs font-pbold px-2'>HOSŤ</BadgeText>
              </Badge>
            </View>
          </View>
        </SettingsBox>

        <AppearanceSettings colorScheme={colorScheme} setColorScheme={setColorScheme} />

        <NotificationsSettings colorScheme={colorScheme} />

        {/* Account Settings */}
        <SettingsBox title="Účet" isClickable={false}>
          <TouchableOpacity className='py-2'>
            <Text className='text-typography-950 text-md font-pregular'>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity className='py-2'>
            <Text className='text-typography-950 text-md font-pregular'>Update Email</Text>
          </TouchableOpacity>
          <TouchableOpacity className='py-2'>
            <Text className='text-error-400 text-md font-psemibold'>Delete Account</Text>
          </TouchableOpacity>
        </SettingsBox>

        {/* App Info */}
        <SettingsBox title="Zvyšok" isClickable={false}>
          <TouchableOpacity className='py-2'>
            <Text className='text-typography-950 text-md font-pregular'>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity className='py-2'>
            <Text className='text-typography-950 text-md font-pregular'>Terms of Service</Text>
          </TouchableOpacity>
          <Text className='text-typography-500 text-sm font-pregular py-2'>
            App Version: 1.0.0
          </Text>
        </SettingsBox>


        <SettingsBox title="Odhlásenie" isClickable={false}>
          <CustomButton
            title="Odhlás sa"
            handlePress={submit}
            containerStyles='h-16 rounded-3xl'
            isLoading={isLoading}
          />
        </SettingsBox>
      </ScrollView>
    </View>
  );
};

export default Settings;