import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors';
import { icons } from '@/constants';
import { BaseLayoutProps } from '@/types/base';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { PropsWithChildren } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BaseLayout = (props: PropsWithChildren<BaseLayoutProps>) => {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className={`bg-background-0 w-full h-full ${props.containerStyles}`}>
      <View className="flex-1 items-end mx-5 mt-5">
        <TouchableOpacity className='rounded-full border-2 border-secondary-500 p-2' onPress={() => router.push("/(settings)")}>
          <Image
            source={icons.settings}
            resizeMode="contain"
            className="w-8 h-8"
            style={{
              tintColor: getRGBColor('typography', '800', colorScheme),
            }}
          />
        </TouchableOpacity>
      </View>
      {props.children}
    </SafeAreaView >
  );
};

export default BaseLayout;