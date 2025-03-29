import { ImageProps } from "react-native";

export type ButtonActionType = "primary" | "secondary" | "tertiary" | "quaternary" | "success" | "error" | "background" | "default";

export type ButtonVariantType = "solid" | "outline" | "combined" | "ghost";

export type CustomButtonProps = {
  title?: string,
  icon?: ImageProps,
  iconPosition?: "left" | "right",
  action?: ButtonActionType,
  variant?: ButtonVariantType,
  handlePress: () => void,
  containerStyles?: string,
  textStyles?: string,
  iconStyles?: string,
  iconTintColor?: string,
  isLoading?: boolean,
};