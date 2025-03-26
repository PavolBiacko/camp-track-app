import { ImageProps } from "react-native";

export type ButtonActionType = "primary" | "secondary" | "tertiary" | "success" | "error" | "default";

export type ButtonVariantType = "solid" | "outline" | "ghost";

export type CustomButtonProps = {
  title?: string,
  icon?: ImageProps,
  iconPosition?: "left" | "right",
  variant?: ButtonVariantType,
  action?: ButtonActionType,
  handlePress: () => void,
  containerStyles?: string,
  textStyles?: string,
  iconStyles?: string,
  iconTintColor?: string,
  isLoading?: boolean,
};