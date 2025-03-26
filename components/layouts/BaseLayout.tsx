import CustomButton from '@/components/custom/CustomButton';
import { icons } from '@/constants';
import { BaseLayoutProps } from '@/types/base';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRGBColor } from '../ui/gluestack-ui-provider/colors';

const BaseLayout = (props: PropsWithChildren<BaseLayoutProps>) => {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className={`bg-background-0 w-full h-full ${props.containerStyles}`}>
      <View className="flex-1 items-end mx-5 mt-5">
        <CustomButton
          icon={icons.settings}
          action="secondary"
          variant="outline"
          handlePress={() => router.push("/(settings)")}
          iconStyles="w-8 h-8"
          iconTintColor={getRGBColor("typography", "800", colorScheme)}
          containerStyles="w-12 h-12 rounded-full"
        />
      </View>
      {props.children}
    </SafeAreaView >
  );
};

export default BaseLayout;