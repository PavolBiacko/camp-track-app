import { Href } from "expo-router";
import { ImageProps } from "react-native";

export type TabIconProps = {
  icon: ImageProps,
  color: string,
  name: string,
  focused: boolean,
}

export type CustomButtonProps = {
  title: string,
  handlePress: () => void,
  isPrimary: boolean,
  containerStyles?: string,
  textStyles?: string,
  icon?: ImageProps,
  isLoading?: boolean,
}

type FieldBasics<T> = {
  title: string;
  formDataTypeKey: keyof T,
  otherStyles?: string;
  placeholder?: string,
};

export type FormFieldProps<T> = FieldBasics<T> & {
  value: T[keyof T],
  handleChangeText: (e: string) => void,
}

export type SignInData = {
  email: string,
  password: string,
};

export type SignUpData = SignInData & {
  passwordCheck: string,
};

export type FormData = SignUpData | SignInData;

type LinkData = {
  prelinkText: string,
  linkText: string,
  linkHref: Href,
}

export type AuthFormProps<T> = {
  title: string,
  fields: FieldBasics<T>[],
  initialValues: T,
  onSubmit: (values: T) => Promise<void>,
  linkData: LinkData,
};
