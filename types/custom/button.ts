import { ColorStyle } from "@/components/ui/gluestack-ui-provider/types";
import { Control, FieldValues } from "react-hook-form";
import { ImageProps } from "react-native";

export type ButtonActionType = ColorStyle | "default";

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
  isDisabled?: boolean,
};

export type DateTimeButtonProps<T extends FieldValues> = {
  title: string,
  formDataTypeKey: keyof T,
  control: Control<T, any>,
  mode: "date" | "time" | "datetime",
  action?: ButtonActionType,
  variant?: ButtonVariantType,
  textStyles?: string,
  otherStyles?: string,
  isDisabled?: boolean,
};