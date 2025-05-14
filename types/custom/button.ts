import { ColorStyle } from "@/components/ui/gluestack-ui-provider/types";
import { PickerItem, PickerItemWithoutNull } from "@/types/base";
import { Control, FieldError, FieldValues } from "react-hook-form";
import { ImageProps } from "react-native";

export type ButtonActionType = ColorStyle | "default";

export type ButtonVariantType = "solid" | "outline" | "combined" | "ghost";

export type DateTimeButtonMode = "time" | "date" | "datetime";

type BaseButtonProps = {
  title?: string;
  action?: ButtonActionType;
  variant?: ButtonVariantType;
}

type ControllableButtonProps<T extends FieldValues> = {
  formDataTypeKey: keyof T;
  control: Control<T, any>;
  error?: FieldError;
}

export type CustomButtonProps = BaseButtonProps & {
  icon?: ImageProps,
  iconPosition?: "left" | "right",
  handlePress: () => void,
  containerStyles?: string,
  textStyles?: string,
  iconStyles?: string,
  iconTintColor?: string,
  isLoading?: boolean,
  isDisabled?: boolean,
};

export type DateTimeButtonProps<T extends FieldValues> = BaseButtonProps & ControllableButtonProps<T> & {
  mode: DateTimeButtonMode,
  isSpinner?: boolean,
  minimumDate?: Date,
  maximumDate?: Date,
  handleSubmit?: () => void,
  titleStyles?: string,
  textStyles?: string,
  otherStyles?: string,
  isDisabled?: boolean,
};

export type SelectButtonProps<T extends FieldValues> = BaseButtonProps & ControllableButtonProps<T> & {
  options?: PickerItem[];
  isLoading?: boolean,
  otherStyles?: string;
};

export type MultiSelectButtonProps<T extends FieldValues> = BaseButtonProps & ControllableButtonProps<T> & {
  options?: PickerItemWithoutNull[];
  isLoading?: boolean,
  otherStyles?: string;
};

export type SwitchableButtonProps = {
  item: PickerItem | PickerItemWithoutNull;
  action?: ButtonActionType;
  isSelected: boolean;
  handleAction: () => void;
}