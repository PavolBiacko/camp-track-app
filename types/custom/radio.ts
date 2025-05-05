import { Control, FieldError, FieldValues } from "react-hook-form";

export type CustomRadioGroupProps<T extends FieldValues> = {
  title?: string;
  formDataTypeKey: keyof T;
  control: Control<T, any>;
  direction?: 'row' | 'column';
  radioOptions: RadioOption[];
  otherStyles?: string;
  containterStyles?: string;
  error?: FieldError;
};

type RadioOption = {
  label: string;
  value: string;
};
