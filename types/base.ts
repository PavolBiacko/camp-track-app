import { ImageProps } from "react-native";

export type ColorScheme = "light" | "dark";

export type BaseLayoutProps = {
  containerStyles?: string,
}

export type LoadingProps = {
  showText: boolean,
  containerStyles?: string,
}

export type SettingsBoxProps = {
  title: string,
  isClickable: boolean,
  handlePress?: () => void,
  containerStyles?: string,
}

export type SettingsSwitchLineProps = {
  text: string;
  icon: ImageProps;
  secondaryIcon?: ImageProps;
  value: boolean;
  onValueChange: (value: boolean) => void;
  colorScheme?: ColorScheme;
  containerStyles?: string;
}

export type ColorSchemeProps = {
  colorScheme?: ColorScheme;
  setColorScheme?: (colorScheme: ColorScheme) => void;
}