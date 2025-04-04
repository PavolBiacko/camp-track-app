import { CurrentTime } from "@/types/base";
import { FieldBasics } from "@/types/custom/field";
import { ActivityStatus } from "@/types/enums/schedule";
import { Activity, ActivityCreate, ActivityUpdate } from "@/types/models/activities";

export const getActiveActivityIndex = (activities: Activity[], currentTime: CurrentTime): number => {
  const { hours: currentHour, minutes: currentMinute } = currentTime;

  try {
    for (let index = 0; index < activities.length; index++) {
      const activity = activities[index];
      const { hours: startHour, minutes: startMinute } = activity.time;

      const nextActivity = activities[index + 1];
      const { hours: endHour, minutes: endMinute } = nextActivity ? nextActivity.time : { hours: "24", minutes: "0" };  // End of the day as a fallback

      // Time comparision
      const isAfterStart =
        (currentHour > parseInt(startHour)) ||
        (currentHour === parseInt(startHour) && currentMinute >= parseInt(startMinute));
      const isBeforeEnd =
        (currentHour < parseInt(endHour)) ||
        (currentHour === parseInt(endHour) && currentMinute < parseInt(endMinute));

      if (isAfterStart && isBeforeEnd) {
        return index;
      }
    }
    return -1; // No activity is active
  } catch {
    console.error('Error getting active activity index:', activities);
    return -1; // No activity is active
  }

};

export const getActivityStatus = (index: number, activeIndex: number): ActivityStatus => {
  if (activeIndex === -1) return ActivityStatus.FUTURE; // No activity is active

  if (index < activeIndex) {
    return ActivityStatus.PAST;
  } else if (index === activeIndex) {
    return ActivityStatus.ACTIVE;
  } else {
    return ActivityStatus.FUTURE;
  }
}

export const getScheduleFormFields = <T extends ActivityCreate | ActivityUpdate>(fields: FieldBasics<T>[]) => {
  return {
    nameField: fields[0],
    descriptionField: fields[1],
    timeField: fields[2],
    dateField: fields[3]
  }
}
