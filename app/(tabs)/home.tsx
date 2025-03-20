import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView className='bg-background-0 w-full h-full'>
      <Text className='text-typography-950'>Home</Text>
    </SafeAreaView>
  )
}

export default Home