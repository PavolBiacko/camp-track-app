import CustomButton from '@/components/custom/CustomButton';
import { icons } from '@/constants';
import { BaseLayoutProps } from '@/types/base';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRGBColor } from '../ui/gluestack-ui-provider/colors';

const BaseLayout = (props: BaseLayoutProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className={`border-b border-outline-300 w-full h-[13%] ${props.containerStyles}`}>
      <View className="items-end mx-5 mt-2">
        <CustomButton
          icon={icons.settings}
          action="secondary"
          variant="outline"
          handlePress={() => router.push("/(main)/(settings)")}
          iconStyles="w-8 h-8"
          iconTintColor={getRGBColor("typography", "800", colorScheme)}
          containerStyles="w-12 h-12 rounded-full"
        />
      </View>
    </SafeAreaView>
  );
};

export default BaseLayout;