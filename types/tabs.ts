import { ImageProps } from "react-native";

export type TabData = {
  name: string,
  icon: ImageProps,
};

export type TabIconProps = TabData & {
  color: string,
  focused: boolean,
};
