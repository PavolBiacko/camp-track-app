import { Href } from "expo-router";
import { ImageProps } from "react-native";
import { ZodSchema } from "zod";
import { FieldBasics } from "./field";

export type AuthFormData = {
  email: string,
  password: string,
  passwordCheck?: string,
  firstName?: string,
  lastName?: string,
};

type LinkData = {
  prelinkText: string,
  linkText: string,
  linkHref: Href,
};

export type AuthFormProps = {
  title: string,
  image?: ImageProps,
  fields: FieldBasics<AuthFormData>[],
  initialValues: AuthFormData,
  validationSchema: ZodSchema,
  onSubmit: (values: AuthFormData) => Promise<void>,
  linkData: LinkData,
};