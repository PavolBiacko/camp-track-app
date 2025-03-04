import { ImageProps } from "react-native";

type TabDataBasic = {
  icon: ImageProps,
  shownLabel?: string,
};

export type TabData = TabDataBasic & {
  name: string,
}

export type TabIconProps = TabDataBasic & {
  color: string,
  focused: boolean,
};
