import { groupRepository } from "@/repositories/groupRepository";
import { GroupCreate } from "@/types/models/groups";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGroupBasicByLeader = (leaderId: string) => {
  const query = useQuery({
    queryKey: ['groups', leaderId],
    queryFn: async () => await groupRepository.readGroupBasicByLeaderForCurrentCampSession(leaderId),
  });
  return { groupBasic: query.data, ...query };
}

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (group: GroupCreate) => {
      return await groupRepository.createGroup(group);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    }
  });
  return { createGroup: mutateAsync, isError };
}
