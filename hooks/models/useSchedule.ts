import { scheduleRepository } from "@/repositories/scheduleRepository";
import { useQuery } from "@tanstack/react-query";

export const useActivitiesByDay = (date: Date) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['activities', date],
    queryFn: async () => await scheduleRepository.readActivitiesByDate(date),
  });
  return { activities: data, isLoading, isError };
}