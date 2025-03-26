import SettingsBox from '@/components/custom/settings/base/SettingsBox';
import { Link } from 'expo-router';
import { FC } from 'react';
import { Text, View } from 'react-native';

const InformationsSettings: FC = () => {
  return (
    <SettingsBox title="Informácie" isClickable={false} containerStyles='p-5 gap-5'>
      <View className='flex-row justify-between items-center'>
        <Text className='text-typography-950 text-md font-pregular'>Ochrana súkromia</Text>
        <Link href="/privacy-policy" className='text-typography-500 text-sm font-psemibold underline'>Zobraziť</Link>
      </View>
      <View className='flex-row justify-between items-center'>
        <Text className='text-typography-950 text-md font-pregular'>Podmienky</Text>
        <Link href="/terms-of-service" className='text-typography-500 text-sm font-psemibold underline'>Zobraziť</Link>
      </View>
      <View className='flex-row justify-between items-center'>
        <Text className='text-typography-950 text-md font-pregular'>Verzia</Text>
        <Text className='text-typography-500 text-sm font-pregular'>1.0.0</Text>
      </View>
      <View className='flex-row justify-between'>
        <Text className='text-typography-950 text-md font-pregular'>Podpora</Text>
        <Text className='text-typography-500 text-sm font-pregular'>palko.biacko@gmail.com</Text>
      </View>
    </SettingsBox>
  )
}

export default InformationsSettings