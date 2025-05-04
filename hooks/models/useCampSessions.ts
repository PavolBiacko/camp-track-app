import { campSessionRepository } from "@/repositories/campSessionRepository";
import { useQuery } from "@tanstack/react-query";

export const useCampSessionsGrouped = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['campSessions'],
    queryFn: async () => await campSessionRepository.readAllCampSessionsGrouped(),
  });
  return { campSessionsGrouped: data, isLoading, isError };
}