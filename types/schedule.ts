import { UserRolesProps } from "./base";
import { ActivityStatus } from "./enums/schedule";

export type ScheduleLineProps = {
  title: string,
  time: ScheduleTime,
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
  mode: 'add' | 'edit',
  activity?: string,
}

export type ScheduleHeaderProps = UserRolesProps;
