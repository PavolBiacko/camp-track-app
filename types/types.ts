import { Href } from "expo-router";
import { ImageProps, KeyboardTypeOptions } from "react-native";

export type TabIconProps = {
  icon: ImageProps,
  color: string,
  name: string,
  focused: boolean,
}

export type CustomButtonProps = {
  title: string,
  handlePress: () => void,
  containerStyles: string,
  textStyles?: string,
  isLoading?: boolean,
}

type FieldBasics = {
  title: string;
  otherStyles?: string;
  placeholder?: string,
  keyboardType?: KeyboardTypeOptions,
};

export type FormFieldProps = FieldBasics & {
  value: string,
  handleChangeText: (e: string) => void,
}

export type SignInData = {
  email: string,
  password: string,
};

export type SignUpData = SignInData & {
  username: string,
};

export type FormData = SignUpData | SignInData;

type LinkData = {
  prelinkText: string,
  linkText: string,
  linkHref: Href,
  shouldReplace: boolean,
}

export type AuthFormProps = {
  title: string,
  fields: FieldBasics[],
  initialValues: FormData,
  onSubmit: (values: FormData) => Promise<void>,
  linkData: LinkData,
};
