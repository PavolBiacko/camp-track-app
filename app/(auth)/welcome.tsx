import CustomButton from "@/components/CustomButton";
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
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full h-full justify-center items-center px-4">
          <Image
            source={images.logo}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white font-pbold text-center">
            Ahoj! Vitaj v mobilnej aplikácii Mr. Oazas. pre vedúcich a rodičov.
          </Text>
          <Text className="text-xl font-pregular text-gray mt-5 text-center">
            Môžeš pokračovať cez tieto služby
          </Text>
          <View className="w-full flex-row justify-evenly items-center mt-5">
            {socialButtons.map((btn, index) => (
              <CustomButton
                key={index}
                handlePress={btn.action}
                containerStyles="w-[4.5rem]"
                icon={btn.icon}
                iconStyles="w-11 h-11"
              />
            ))}
          </View>
          <Text className="text-xl font-pregular text-gray mt-5 text-center">
            alebo
          </Text>
          <CustomButton
            title="Pokračuj cez Email"
            icon={icons.email}
            handlePress={() => router.push("/sign-in")}
            isPrimary={true}
            iconStyles="w-8 h-8"
            containerStyles="w-full mt-5"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}