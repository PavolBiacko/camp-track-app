import { financeRepository } from "@/repositories/financeRepository";
import { CashRegisterRecord } from "@/types/finance";
import { TransactionCreate } from "@/types/models/transactions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChildrenByLeader = (leaderId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['children', leaderId],
    queryFn: async () => await financeRepository.readChildrenByLeader(leaderId),
  });
  return { children: data, isLoading, isError };
}

export const useChildByIdWithLeader = (childId: string, leaderId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['children', childId, leaderId],
    queryFn: async () => await financeRepository.readChildByIdWithLeader(childId, leaderId),
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

export const useUpdateAccountBalanceWithLeader = (childId: string, leaderId: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (accountBalance: number) => {
      return await financeRepository.updateAccountBalanceByIdWithLeader(childId, leaderId, accountBalance);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children'] });
    }
  });
  return { updateAccountBalance: mutateAsync, isError };
}

export const useUpdateCashRegisterByLeader = (leaderId: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (counts: CashRegisterRecord) => {
      return await financeRepository.updateCashRegisterByLeader(leaderId, counts);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cashRegister'] });
    }
  });
  return { updateCashRegister: mutateAsync, isError };
}

export const useTransactionsInDateRange = (dateFrom: Date, dateTo: Date) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['transactions', dateFrom, dateTo],
    queryFn: async () => await financeRepository.readTransactionsInDateRange(dateFrom, dateTo),
  });
  return { transactions: data, isLoading, isError };
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (transaction: TransactionCreate) => {
      return await financeRepository.createTransaction(transaction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    }
  });
  return { createTransaction: mutateAsync, isError };
}