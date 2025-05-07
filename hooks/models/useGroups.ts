import { groupRepository } from "@/repositories/groupRepository";
import { useQuery } from "@tanstack/react-query";

export const useGroupBasicByLeader = (leaderId: string) => {
  const query = useQuery({
    queryKey: ['groups', leaderId],
    queryFn: async () => await groupRepository.readGroupBasicByLeaderForCurrentCampSession(leaderId),
  });
  return { groupBasic: query.data, ...query };
}