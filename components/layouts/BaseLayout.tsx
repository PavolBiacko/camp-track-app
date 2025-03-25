import { Button } from '@/components/ui/button';
import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors';
import { icons } from '@/constants';
import { BaseLayoutProps } from '@/types/base';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { PropsWithChildren } from 'react';
import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BaseLayout = (props: PropsWithChildren<BaseLayoutProps>) => {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className={`bg-background-0 w-full h-full ${props.containerStyles}`}>
      <View className="flex-1 items-end mx-5 mt-5">
        <Button size='md' variant='outline' action="primary" className='w-0 rounded-full' onPress={() => router.push("/(settings)")}>
          <Image
            source={icons.settings}
            resizeMode="contain"
            className="w-6 h-6"
            style={{
              tintColor: getRGBColor('typography', '950', colorScheme),
            }}
          />
        </Button>
      </View>
      {props.children}
    </SafeAreaView >
  );
};

export default BaseLayout;