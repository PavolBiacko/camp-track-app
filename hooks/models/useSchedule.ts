import { scheduleRepository } from "@/repositories/scheduleRepository";
import { useQuery } from "@tanstack/react-query";

export const useAllActivities = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['activities'],
    queryFn: () => scheduleRepository.readActivities(),
  });
  return { activities: data, isLoading, isError };
}