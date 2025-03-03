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
          <Text className="text-2xl text-white font-pbold text-center">
            Ahoj! Vitaj v mobilnej aplikácii Mr. Oazas. pre vedúcich a rodičov.
          </Text>
          <Text className="text-xl font-pregular text-gray mt-5 text-center">
            Môžeš pokračovať cez tieto služby
          </Text>
          <View className="w-full flex-row justify-evenly items-center mt-5">
            <CustomButton
              title="G"
              handlePress={() => null}
              isPrimary={false}
              containerStyles="w-[4.5rem] bg-red"
            />
            <CustomButton
              title="F"
              handlePress={() => null}
              isPrimary={false}
              containerStyles="w-[4.5rem] bg-blue"
            />
            <CustomButton
              title="A"
              handlePress={() => null}
              isPrimary={false}
              containerStyles="w-[4.5rem] bg-white"
            />
          </View>
          <Text className="text-xl font-pregular text-gray mt-5 text-center">
            alebo
          </Text>
          <CustomButton
            title="Pokračuj cez Email"
            handlePress={() => router.push("/sign-in")}
            isPrimary={true}
            containerStyles="w-full mt-5 "
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}