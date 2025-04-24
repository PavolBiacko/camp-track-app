import { groupRepository } from "@/repositories/groupRepository";
import { useQuery } from "@tanstack/react-query";

export const useGroupNumberByLeader = (leaderId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['group', leaderId],
    queryFn: async () => await groupRepository.readGroupNumberByLeader(leaderId),
  });
  return { groupNumber: data, isLoading, isError };
}