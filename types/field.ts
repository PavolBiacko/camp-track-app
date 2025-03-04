export type FieldBasics<T> = {
  title: string;
  formDataTypeKey: keyof T,
  otherStyles?: string;
  placeholder?: string,
};

export type FormFieldProps<T> = FieldBasics<T> & {
  value: T[keyof T],
  handleChangeText: (e: string) => void,
};