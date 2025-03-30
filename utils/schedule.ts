import { CurrentTime } from "@/types/base";
import { Activity } from "@/types/models/activities";

export const getActiveActivityIndex = (activities: Activity[], currentTime: CurrentTime): number => {
  const { hours: currentHour, minutes: currentMinute } = currentTime;

  for (let index = 0; index < activities.length; index++) {
    const activity = activities[index];
    const { hours: startHour, minutes: startMinute } = activity.time;

    const nextActivity = activities[index + 1];
    const { hours: endHour, minutes: endMinute } = nextActivity ? nextActivity.time : { hours: "24", minutes: "0" }; // End of the day as a fallback

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
};

