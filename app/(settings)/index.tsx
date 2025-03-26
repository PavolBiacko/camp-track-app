import CustomButton from '@/components/custom/CustomButton';
import SettingsBox from '@/components/custom/SettingsBox';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors';
import { icons } from '@/constants';
import authRepository from '@/repositories/authRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

const Settings = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

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

  useEffect(() => {
    setColorScheme(isDarkMode ? "dark" : "light");
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem("colorScheme", colorScheme?.toString() || "system");
      } catch (error) {
        console.error('Failed to save theme to AsyncStorage:', error);
      }
    };
    saveTheme();
  }, [isDarkMode, colorScheme]);

  const [programNotify, setProgramNotify] = useState(true);
  const [messagesNotify, setMessagesNotification] = useState(false);
  const [photosNotify, setPhotosNotify] = useState(false);

  return (
    <View className='bg-background-0 w-full h-full'>
      <ScrollView>
        {/* Profile Settings */}
        <SettingsBox title="Profil" isClickable={true} containerStyles='bg-secondary-50'>
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
                <Text className='text-typography-950 text-xs font-pbold px-2'>HOSŤ</Text>
              </Badge>
            </View>
          </View>
        </SettingsBox>

        {/* Theme Settings */}
        <SettingsBox title="Vzhľad" isClickable={false}>
          <View className='flex-row justify-between items-center'>
            <View className='flex-row justify-center items-center gap-3'>
              <Image
                source={isDarkMode ? icons.darkMode : icons.lightMode}
                resizeMode="contain"
                tintColor={getRGBColor('typography', '950', colorScheme)}
                className="w-7 h-7"
              />
              <Text className='text-typography-950 text-md font-pregular'>Tmavý mód</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={(value) => setIsDarkMode(value)}
            />
          </View>
        </SettingsBox>

        {/* Notification Settings */}
        <SettingsBox title="Notifikácie" isClickable={false}>
          <View className='flex-row justify-between items-center'>
            <View className='flex-row justify-center items-center gap-3'>
              <Image
                source={icons.calendar}
                resizeMode="contain"
                tintColor={getRGBColor('typography', '950', colorScheme)}
                className="w-7 h-7"
              />
              <Text className='text-typography-950 text-md font-pregular'>Program</Text>
            </View>
            <Switch
              value={programNotify}
              onValueChange={(value) => setProgramNotify(value)}
            />
          </View>
          <View className='flex-row justify-between items-center'>
            <View className='flex-row justify-center items-center gap-3'>
              <Image
                source={icons.message}
                resizeMode="contain"
                tintColor={getRGBColor('typography', '950', colorScheme)}
                className="w-7 h-7"
              />
              <Text className='text-typography-950 text-md font-pregular'>Správy</Text>
            </View>
            <Switch
              value={messagesNotify}
              onValueChange={(value) => setMessagesNotification(value)}
            />
          </View>
          <View className='flex-row justify-between items-center'>
            <View className='flex-row justify-center items-center gap-3'>
              <Image
                source={icons.gallery}
                resizeMode="contain"
                tintColor={getRGBColor('typography', '950', colorScheme)}
                className="w-7 h-7"
              />
              <Text className='text-typography-950 text-md font-pregular'>Fotky</Text>
            </View>
            <Switch
              value={photosNotify}
              onValueChange={(value) => setPhotosNotify(value)}
            />
          </View>
        </SettingsBox>

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