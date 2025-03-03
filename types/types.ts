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

type FieldBasics = {
  title: string;
  otherStyles?: string;
  placeholder?: string,
  keyboardType?: "email" | "password",
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
}

export type AuthFormProps = {
  title: string,
  fields: FieldBasics[],
  initialValues: FormData,
  onSubmit: (values: FormData) => Promise<void>,
  linkData: LinkData,
};
