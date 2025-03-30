import { ScheduleTime } from "@/types/models/activities";
import { UserRolesProps } from "./base";
import { ActivityStatus } from "./enums/schedule";

export type ScheduleLineProps = {
  title: string,
  time: ScheduleTime,
  status: ActivityStatus,
  textStyles?: string,
  containerStyles?: string,
}

export type ScheduleHeaderProps = UserRolesProps;