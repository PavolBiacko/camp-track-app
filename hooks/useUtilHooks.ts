import { getRGBColor } from "@/components/ui/gluestack-ui-provider/colors";
import { TabScreenOptions } from "@/types/options";
import { useFonts } from "expo-font";
import { Platform } from "react-native";

export function useCapitalizeWord(text: string | undefined): string | undefined {
  if (!text) {
    return text;
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export function useAppFonts(): [boolean, Error | null] {
  return useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });
}

export function useTabScreenOptions(colorScheme?: "light" | "dark"): TabScreenOptions {
  return {
    tabBarShowLabel: false,
    tabBarActiveTintColor: getRGBColor("primary", "500", colorScheme),
    tabBarInactiveTintColor: getRGBColor("typography", "950", colorScheme),
    tabBarActiveBackgroundColor: getRGBColor("background", "300", colorScheme),
    tabBarInactiveBackgroundColor: getRGBColor("background", "100", colorScheme),
    tabBarStyle: {
      borderColor: getRGBColor("background", "300", colorScheme),
      borderTopWidth: 2,
      height: Platform.OS === "ios" ? 75 : 60,
    },
  };
}