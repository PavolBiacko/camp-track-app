import { Platform } from "react-native";

const tabScreenOptions = {
  tabBarShowLabel: false,
  tabBarActiveTintColor: "#FFA001",
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