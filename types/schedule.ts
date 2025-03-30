import { ScheduleTime } from "@/types/models/activities";
import { UserRolesProps } from "./base";

export type ScheduleLineProps = {
  title: string,
  time: ScheduleTime,
  textStyles?: string,
  containerStyles?: string,
}

export type ScheduleHeaderProps = UserRolesProps;