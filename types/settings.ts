import { User } from "@/types/models/users";
import { ImageProps } from "react-native";
import { ColorScheme } from "./base";

export type SettingsBoxProps = {
  title: string,
  isClickable: boolean,
  handlePress?: () => void,
  containerStyles?: string,
}

export type SettingsSwitchLineProps = {
  text: string;
  secondaryText?: string;
  icon: ImageProps;
  secondaryIcon?: ImageProps;
  value: boolean;
  onValueChange: (value: boolean) => void;
  colorScheme?: ColorScheme;
  containerStyles?: string;
}

export type ProfileBadgeProps = {
  user: User;
};
