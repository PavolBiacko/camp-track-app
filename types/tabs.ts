import { ImageProps } from "react-native";
import { UserRoles } from "./roles";

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
