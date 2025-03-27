import CustomButton from "@/components/custom/CustomButton";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const socialButtons = [
  { icon: icons.google2, action: () => null },
  { icon: icons.facebook2, action: () => null },
  { icon: icons.apple2, action: () => null },
];

export default function Welcome() {
  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full h-full justify-center items-center px-4">
          <Image
            source={images.logo}
            className="w-full h-[300px]"
            resizeMode="contain"
          />
          <Text className="text-typography-950 text-2xl font-pbold text-center">
            Ahoj! Vitaj v mobilnej aplikácii Mr. Oazas. pre vedúcich a rodičov.
          </Text>
          <Text className="text-typography-950 text-xl font-pregular mt-5 text-center">
            Môžeš pokračovať cez tieto služby
          </Text>
          <View className="w-full flex-row justify-evenly items-center mt-5">
            {socialButtons.map((btn, index) => (
              <CustomButton
                key={index}
                icon={btn.icon}
                action="default"
                handlePress={btn.action}
                iconStyles="w-11 h-11"
                containerStyles="w-[4.5rem] h-[4.5rem] rounded-full bg-background-500"
              />
            ))}
          </View>
          <Text className="text-typography-950 text-xl font-pregular mt-5 text-center">
            alebo
          </Text>
          <CustomButton
            title="Pokračuj cez Email"
            icon={icons.email}
            action="primary"
            handlePress={() => router.push("/login")}
            iconStyles="w-8 h-8"
            containerStyles="w-full h-[4.5rem] mt-5 rounded-3xl"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}