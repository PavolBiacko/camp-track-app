import { Href } from "expo-router";
import { DefaultValues, FieldValues } from "react-hook-form";
import { ImageProps } from "react-native";
import { ZodSchema } from "zod";
import { FieldBasics } from "./field";

type LinkData = {
  prelinkText: string,
  linkText: string,
  linkHref: Href,
};

export type FormProps<T extends FieldValues> = {
  title: string,
  image?: ImageProps,
  fields: FieldBasics<T>[],
  initialValues: DefaultValues<T>,
  validationSchema: ZodSchema<T>,
  onSubmit: (values: T) => Promise<void>,
  buttonText?: string,
  linkData?: LinkData,
};