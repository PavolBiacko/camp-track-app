export type CustomSwitchProps = {
  onFalseText: string,
  onTrueText: string,
  value: boolean;
  onValueChange: (value: boolean) => void;
  textStyles?: string;
}