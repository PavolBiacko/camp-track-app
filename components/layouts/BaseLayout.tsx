import CustomButton from '@/components/custom/CustomButton';
import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors';
import { icons } from '@/constants';
import { BaseLayoutProps } from '@/types/base';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BaseLayout = (props: PropsWithChildren<BaseLayoutProps>) => {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className={`w-full h-full ${props.containerStyles}`}>
      <View className="bg-background-0 border-b border-outline-300 items-end px-5 py-3">
        <CustomButton
          icon={icons.settings}
          action="background"
          variant="combined"
          handlePress={() => router.push("/(main)/(settings)")}
          iconStyles="w-8 h-8"
          iconTintColor={getRGBColor("typography", "700", colorScheme)}
          containerStyles="w-12 h-12 rounded-full"
        />
      </View>
      {props.children}
    </SafeAreaView>
  );
};

export default BaseLayout;