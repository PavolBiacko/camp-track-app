import { groupAccountRepository } from "@/repositories/groupAccountRepository";
import { ChildBalanceUpdate } from "@/types/models/children";
import { GroupAccountCreate } from "@/types/models/groupAccounts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useManyAccountsWithGroup = (groupId: number) => {
  const query = useQuery({
    queryKey: ['groupAccounts', groupId],
    queryFn: async () => await groupAccountRepository.readManyAccountsByGroup(groupId),
  });
  return { children: query.data, ...query };
}

export const useManyAccountsWithParent = (parentId: string) => {
  const query = useQuery({
    queryKey: ['groupAccounts', parentId],
    queryFn: async () => await groupAccountRepository.readManyAccountsByParent(parentId),
  });
  return { children: query.data, ...query };
}

export const useManyAccountsWithLeader = (leaderId: string) => {
  const query = useQuery({
    queryKey: ['groupAccounts', leaderId],
    queryFn: async () => await groupAccountRepository.readManyAccountsByLeader(leaderId),
  });
  return { children: query.data, ...query };
}

export const useAccountByChildIdWithLeader = (childId: string | null, leaderId: string) => {
  const query = useQuery({
    queryKey: ['groupAccounts', leaderId, childId],
    queryFn: async () => await groupAccountRepository.readAccountByChildIdWithLeader(childId, leaderId),
  });
  return { child: query.data, ...query };
}

export const useUpdateAccountBalanceWithLeader = (childId: string | null, leaderId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (accountBalance: number) => {
      return await groupAccountRepository.updateAccountBalanceByChildIdWithLeader(childId, leaderId, accountBalance);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['groupAccounts', leaderId]
      });
      queryClient.invalidateQueries({
        queryKey: ['groupAccounts', childId]
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
      return await groupAccountRepository.updateManyAccountBalancesWithLeader(leaderId, accountUpdates);
    },
    onSuccess: (_data, accountUpdates) => {
      queryClient.invalidateQueries({
        queryKey: ['groupAccounts', leaderId]
      });
      accountUpdates.forEach((accountUpdate) => {
        queryClient.invalidateQueries({
          queryKey: ['groupAccounts', accountUpdate.childId],
        });
        queryClient.invalidateQueries({
          queryKey: ['groupAccounts', leaderId, accountUpdate.childId],
        });
      });
    }
  });
  return { updateManyAccountBalances: mutation.mutateAsync, ...mutation };
}

export const useCreateManyGroupAccounts = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (groupAccounts: GroupAccountCreate[]) => {
      return await groupAccountRepository.createManyAccounts(groupAccounts);
    },
    onSuccess: (_data, groupAccounts) => {
      groupAccounts.forEach((groupAccount) => {
        queryClient.invalidateQueries({
          queryKey: ['groupAccounts', groupAccount.groupId],
        });
        queryClient.invalidateQueries({
          queryKey: ['groupAccounts', groupAccount.childId],
        });
      });
    }
  });
  return { createGroupAccounts: mutation.mutateAsync, ...mutation };
}

export const useDeleteManyGroupAccounts = (groupId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      return await groupAccountRepository.deleteManyAccounts(groupId, ids);
    },
    onSuccess: (data) => {
      data.forEach((groupAccount) => {
        queryClient.invalidateQueries({
          queryKey: ['groupAccounts', groupAccount.groupId],
        });
        queryClient.invalidateQueries({
          queryKey: ['groupAccounts', groupAccount.childId],
        });
      });
    }
  });
  return { deleteGroupAccounts: mutation.mutateAsync, ...mutation };
}