import { Control, FieldError, FieldValues, UseFormRegister } from "react-hook-form";

export type FieldBasics<T extends FieldValues> = {
  title?: string,
  formDataTypeKey: keyof T,
  placeholder?: string,
  otherStyles?: string,
};

export type FormFieldProps<T extends FieldValues> = FieldBasics<T> & {
  control: Control<T, any>,
  register: UseFormRegister<T>,
  error?: FieldError,
  maxLength?: number,
  isMultine?: boolean,
  numberOfLines?: number,
  isMultineFixed?: boolean,
  autoCapitalize?: "none" | "sentences" | "words" | "characters",
}