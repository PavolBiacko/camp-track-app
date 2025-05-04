import { UserRoles } from "@/types/enums/roles";
import { ImageProps } from "react-native";

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