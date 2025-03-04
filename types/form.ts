import { Href } from "expo-router";
import { FieldBasics } from "./field";

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
};

export type AuthFormProps<T> = {
  title: string,
  fields: FieldBasics<T>[],
  initialValues: T,
  onSubmit: (values: T) => Promise<void>,
  linkData: LinkData,
};