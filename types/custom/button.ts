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

export type DateTimeButtonMode = "time" | "date" | "datetime";

export type DateTimeButtonProps<T extends FieldValues> = {
  title?: string,
  formDataTypeKey: keyof T,
  control: Control<T, any>,
  mode: DateTimeButtonMode,
  isSpinner?: boolean,
  minimumDate?: Date,
  maximumDate?: Date,
  action?: ButtonActionType,
  variant?: ButtonVariantType,
  handleSubmit?: () => void,
  titleStyles?: string,
  textStyles?: string,
  otherStyles?: string,
  isDisabled?: boolean,
};

// Define the type for the data
export type PickerItem = {
  id: string;
  range: string;
};

// Define the props for the custom picker button
export type SelectButtonProps = {
  title?: string;
  action?: ButtonActionType;
  variant?: ButtonVariantType;
  data: PickerItem[];
  onSelect: (selectedItem: PickerItem) => void; // Callback to handle selection
  otherStyles?: string;
}