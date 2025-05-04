import { accountRepository } from "@/repositories/accountRepository";
import { ChildBalanceUpdate } from "@/types/models/children";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useManyAccountsWithLeader = (leaderId: string) => {
  const mutation = useQuery({
    queryKey: ['groupAccounts', leaderId],
    queryFn: async () => await accountRepository.readManyAccountsByLeader(leaderId),
  });
  return { children: mutation.data, ...mutation };
}

export const useAccountByChildIdWithLeader = (childId: string | null, leaderId: string) => {
  const mutation = useQuery({
    queryKey: ['groupAccounts', leaderId, childId],
    queryFn: async () => await accountRepository.readAccountByChildIdWithLeader(childId, leaderId),
  });
  return { child: mutation.data, ...mutation };
}

export const useUpdateAccountBalanceWithLeader = (childId: string | null, leaderId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (accountBalance: number) => {
      return await accountRepository.updateAccountBalanceByChildIdWithLeader(childId, leaderId, accountBalance);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['groupAccounts', leaderId]
      });
      queryClient.invalidateQueries({
        queryKey: ['groupAccounts', leaderId, childId]
      });
    }
  });
  return { updateAccountBalance: mutation.mutateAsync, ...mutation };
}

export const useUpdateManyAccountBalancesWithLeader = (leaderId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (accountUpdates: ChildBalanceUpdate[]) => {
      return await accountRepository.updateManyAccountBalancesWithLeader(leaderId, accountUpdates);
    },
    onSuccess: (_data, accountUpdates) => {
      queryClient.invalidateQueries({
        queryKey: ['groupAccounts', leaderId]
      });
      accountUpdates.forEach((accountUpdate) => {
        queryClient.invalidateQueries({
          queryKey: ['groupAccounts', leaderId, accountUpdate.childId],
        });
      });
    }
  });
  return { updateManyAccountBalances: mutation.mutateAsync, ...mutation };
}