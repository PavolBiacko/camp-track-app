import { ScheduleTime } from "@/types/models/activities";
import { UserRolesProps } from "./base";

export type ScheduleLineProps = {
  title: string,
  time: ScheduleTime,
  isActive: boolean,
  textStyles?: string,
  containerStyles?: string,
}

export type ScheduleHeaderProps = UserRolesProps;