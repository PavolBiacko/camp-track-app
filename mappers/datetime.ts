import { DateTimeButtonMode } from "@/types/custom/button";
import { ScheduleTime } from "@/types/schedule";

export const mapDbTimeToScheduleTime = (dbTime: string): ScheduleTime => {
  return {
    hours: dbTime.split(":")[0],
    minutes: dbTime.split(":")[1],
  };
}

export const mapDateTimeToString = (date: Date | null, mode: DateTimeButtonMode): string | null => {
  if (!date) {
    return null;
  }

  switch (mode) {
    case "time":
      return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    case "date":
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    case "datetime":
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
};

export const mapStringToDateTime = (value: string, mode: DateTimeButtonMode): Date => {
  if (!value) {
    return new Date();
  }

  switch (mode) {
    case "time": {
      const [hours, minutes] = value.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      return date;
    }

    case "date": {
      const [year, month, day] = value.split("-");
      return new Date(`${year}-${month}-${day}`);
    }

    case "datetime": {
      const [datePart, timePart] = value.split(" ");
      const [day, month, year] = datePart.split(".");
      const [hours, minutes] = timePart.split(":");
      return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
    }

    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
};