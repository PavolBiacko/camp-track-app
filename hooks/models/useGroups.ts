import { groupRepository } from "@/repositories/groupRepository";
import { GroupCreate, GroupUpdate } from "@/types/models/groups";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGroupBasicByLeader = (leaderId: string) => {
  const query = useQuery({
    queryKey: ['groups', leaderId],
    queryFn: async () => await groupRepository.readGroupBasicByLeaderForCurrentCampSession(leaderId),
  });
  return { groupBasic: query.data, ...query };
}

export const useAllGroupsGroupedBySession = () => {
  const query = useQuery({
    queryKey: ['groupsGrouped'],
    queryFn: async () => await groupRepository.readAllGroupsComplexGrouped()
  });
  return { groupsGrouped: query.data, ...query };
}

export const useAllGroups = () => {
  const query = useQuery({
    queryKey: ['groups'],
    queryFn: async () => await groupRepository.readAllGroupsComplex()
  });
  return { groups: query.data, ...query };
}

export const useGroupById = (id: number) => {
  const query = useQuery({
    queryKey: ['groups', id],
    queryFn: async () => await groupRepository.readGroupById(id)
  });
  return { group: query.data, ...query };
}

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (group: GroupCreate) => {
      return await groupRepository.createGroup(group);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      queryClient.invalidateQueries({ queryKey: ['groupsGrouped'] });
    }
  });
  return { createGroup: mutateAsync, isError };
}

export const useUpdateGroup = (id: number) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (group: GroupUpdate) => {
      return await groupRepository.updateGroup(id, group);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupsGrouped'] });
      queryClient.invalidateQueries({ queryKey: ['groups', id] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    }
  });
  return { updateGroup: mutateAsync, isError };
}

export const useDeleteGroup = (id: number) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async () => {
      return await groupRepository.deleteGroup(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupsGrouped'] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    }
  });
  return { deleteGroup: mutateAsync, isError };
}
