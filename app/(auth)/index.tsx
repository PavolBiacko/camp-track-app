import CustomButton from "@/components/custom/CustomButton";
import { getRGBColor } from "@/components/ui/gluestack-ui-provider/colors";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const socialButtons = [
  { icon: icons.google2, action: () => null },
  { icon: icons.facebook2, action: () => null },
  { icon: icons.apple2, action: () => null },
];


export default function Welcome() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full h-full justify-center items-center px-4 gap-10">
          <Image
            source={images.logo}
            className="w-full h-[300px]"
            resizeMode="contain"
          />
          <Text className="text-typography-950 text-2xl font-pbold text-center">
            Ahoj! Vitaj v mobilnej aplikácii Mr. Oazas. pre vedúcich a rodičov.
          </Text>
          <CustomButton
            title="Pokračuj cez Email"
            icon={icons.email}
            action="primary"
            handlePress={() => router.push("/login")}
            iconStyles="w-8 h-8"
            iconTintColor={getRGBColor("typography", "800", colorScheme)}
            containerStyles="w-full h-[4.5rem] mt-5 rounded-3xl"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}