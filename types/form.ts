import { Href } from "expo-router";
import { FieldBasics } from "./field";

export type AuthFormData = {
  email: string,
  password: string,
  passwordCheck?: string
};

type LinkData = {
  prelinkText: string,
  linkText: string,
  linkHref: Href,
};

export type AuthFormProps = {
  title: string,
  fields: FieldBasics<AuthFormData>[],
  initialValues: AuthFormData,
  onSubmit: (values: AuthFormData) => Promise<void>,
  linkData: LinkData,
};