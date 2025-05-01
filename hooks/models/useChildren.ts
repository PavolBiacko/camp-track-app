import { childRepository } from "@/repositories/childRepository";
import { ChildBalanceUpdate } from "@/types/models/children";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChildrenByLeader = (leaderId: string) => {
  const mutation = useQuery({
    queryKey: ['children', leaderId],
    queryFn: async () => await childRepository.readChildrenByLeader(leaderId),
  });
  return { children: mutation.data, ...mutation };
}

export const useChildByIdWithLeader = (childId: string | null, leaderId: string) => {
  const mutation = useQuery({
    queryKey: ['children', leaderId, childId],
    queryFn: async () => await childRepository.readChildByIdWithLeader(childId, leaderId),
  });
  return { child: mutation.data, ...mutation };
}

export const useUpdateAccountBalanceWithLeader = (childId: string | null, leaderId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (accountBalance: number) => {
      return await childRepository.updateAccountBalanceByIdWithLeader(childId, leaderId, accountBalance);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['children', leaderId]
      });
      queryClient.invalidateQueries({
        queryKey: ['children', leaderId, childId]
      });
    }
  });
  return { updateAccountBalance: mutation.mutateAsync, ...mutation };
}

export const useUpdateManyAccountBalancesWithLeader = (leaderId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (accountUpdates: ChildBalanceUpdate[]) => {
      return await childRepository.updateManyAccountBalancesWithLeader(leaderId, accountUpdates);
    },
    onSuccess: (_data, accountUpdates) => {
      queryClient.invalidateQueries({
        queryKey: ['children', leaderId]
      });
      accountUpdates.forEach((accountUpdate) => {
        queryClient.invalidateQueries({
          queryKey: ['children', leaderId, accountUpdate.childId],
        });
      });
    }
  });
  return { updateManyAccountBalances: mutation.mutateAsync, ...mutation };
}