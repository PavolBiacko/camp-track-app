import { childRepository } from "@/repositories/childRepository";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChildrenByLeader = (leaderId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['children', leaderId],
    queryFn: async () => await childRepository.readChildrenByLeader(leaderId),
  });
  return { children: data, isLoading, isError };
}

export const useChildByIdWithLeader = (childId: string, leaderId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['children', childId, leaderId],
    queryFn: async () => await childRepository.readChildByIdWithLeader(childId, leaderId),
  });
  return { child: data, isLoading, isError };
}

export const useUpdateAccountBalanceWithLeader = (childId: string, leaderId: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (accountBalance: number) => {
      return await childRepository.updateAccountBalanceByIdWithLeader(childId, leaderId, accountBalance);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children'] });
    }
  });
  return { updateAccountBalance: mutateAsync, isError };
}