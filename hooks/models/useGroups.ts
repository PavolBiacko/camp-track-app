import { groupRepository } from "@/repositories/groupRepository";
import { useQuery } from "@tanstack/react-query";

export const useGroupBasicByLeader = (leaderId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['groups', leaderId],
    queryFn: async () => await groupRepository.readGroupBasicByLeaderForCurrentCampSession(leaderId),
  });
  return { groupBasic: data, isLoading, isError };
}