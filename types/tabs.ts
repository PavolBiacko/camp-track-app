import { ImageProps } from "react-native";
import { UserRoles } from "./enums/roles";

type TabConfigsBasic = {
  icon: ImageProps,
  shownLabel?: string,
};

export type TabConfigs = TabConfigsBasic & {
  name: string,
  roles: UserRoles[],
}

export type TabIconProps = TabConfigsBasic & {
  color: string,
  focused: boolean,
};