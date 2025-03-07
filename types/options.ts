import { BottomTabNavigationOptions, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";

export type TabScreenOptions = BottomTabNavigationOptions | ((props: {
  route: RouteProp<ParamListBase, string>;
  navigation: BottomTabNavigationProp<ParamListBase, string, undefined>;
  theme: ReactNavigation.Theme;
}) => BottomTabNavigationOptions) | undefined
