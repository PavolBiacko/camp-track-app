import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { images } from "../constants";

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full h-full justify-center items-center px-4">
          <Image
            source={images.mroazaslogo}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white font-bold text-center">
            Ahoj, táborový dobrodruh! Vitaj v mobilnej aplikácii Mr. Oazas.
          </Text>
          <Text className="text-sm font-pregular text-gray-100 mt-3 text-center">
            Či už si rodič alebo vedúci, určite si tu prídeš na svoje.
          </Text>
          <CustomButton
            title="Pokračuj do prihlásenia"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}