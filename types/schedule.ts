import { UserRolesProps } from "@/types/base";
import { ActivityStatus } from "@/types/enums/schedule";
import { Activity } from "@/types/models/activities";

export type ScheduleLineProps = {
  activity: Activity,
  status: ActivityStatus,
  isCustom: boolean,
  textStyles?: string,
  containerStyles?: string,
}

export type ScheduleTime = {
  hours: string,
  minutes: string,
}

export type ScheduleContextType = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export type ScheduleParams = {
  activityId: string,  // number, but string is used in router
}

export type ScheduleHeaderProps = UserRolesProps;
