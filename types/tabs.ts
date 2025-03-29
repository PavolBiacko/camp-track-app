import { BottomTabNavigationOptions, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { ImageProps } from "react-native";
import { UserRoles } from "./enums/roles";

type TabDataBasic = {
  icon: ImageProps,
  shownLabel?: string,
};

export type TabData = TabDataBasic & {
  name: string,
  roles: UserRoles[],
}

export type TabIconProps = TabDataBasic & {
  color: string,
  focused: boolean,
};

export type TabScreenOptions = BottomTabNavigationOptions | ((props: {
  route: RouteProp<ParamListBase, string>;
  navigation: BottomTabNavigationProp<ParamListBase, string, undefined>;
  theme: ReactNavigation.Theme;
}) => BottomTabNavigationOptions) | undefined