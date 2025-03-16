import { TabScreenOptions } from "@/types/options";
import { Platform } from "react-native";
import colors from "./colors";

const tabScreenOptions: TabScreenOptions = {
  tabBarShowLabel: false,
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.light.low,
  tabBarStyle: {
    backgroundColor: colors.dark.high,
    borderColor: colors.gray,
    borderTopWidth: 2,
    height: Platform.OS === "ios" ? 75 : 60,
  },
};

export default {
  tabScreenOptions
}