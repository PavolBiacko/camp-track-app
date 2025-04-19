import { financeRepository } from "@/repositories/financeRepository";
import { CashRegisterRecord } from "@/types/finance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChildrenByLeader = (leaderId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['children', leaderId],
    queryFn: async () => await financeRepository.readChildrenByLeader(leaderId),
  });
  return { children: data, isLoading, isError };
}

export const useChildById = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['children', id],
    queryFn: async () => await financeRepository.readChildById(id),
  });
  return { child: data, isLoading, isError };
}

export const useCashRegisterByLeader = (leaderId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['cashRegister', leaderId],
    queryFn: async () => await financeRepository.readCashRegisterByLeader(leaderId),
  });
  return { cashRegister: data, isLoading, isError };
}

export const useUpdateAccountBalance = (id: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (accountBalance: number) => {
      return await financeRepository.updateAccountBalanceById(id, accountBalance);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children'] });
    }
  });
  return { updateAccountBalance: mutateAsync, isError };
}

export const useUpdateCashRegisterByChild = (childId: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (counts: CashRegisterRecord) => {
      return await financeRepository.updateCashRegisterByChild(childId, counts);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cashRegister'] });
    }
  });
  return { updateCashRegister: mutateAsync, isError };
}