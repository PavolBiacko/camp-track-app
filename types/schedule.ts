import { ColorStyles, UserRolesProps } from "./base";

export type ScheduleLineProps = {
  title: string,
  time: string,
  color: ColorStyles,
  textStyles?: string,
  containerStyles?: string,
}

export type ScheduleHeaderProps = UserRolesProps;