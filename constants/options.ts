import { TabScreenOptions } from "@/types/options";
import { Platform } from "react-native";
import colors from "./colors";

const tabScreenOptions: TabScreenOptions = {
  tabBarShowLabel: false,
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: "#CDCDE0",
  tabBarStyle: {
    backgroundColor: "#161622",
    borderColor: "#555555",
    borderTopWidth: 2,
    height: Platform.OS === "ios" ? 75 : 60,
  },
};

export default {
  tabScreenOptions
}