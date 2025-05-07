import { transactionRepository } from "@/repositories/transactionRepository";
import { TransactionCreate } from "@/types/models/transactions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTransactionsInDateRange = (dateFrom: Date, dateTo: Date) => {
  const query = useQuery({
    queryKey: ['transactions', dateFrom, dateTo],
    queryFn: async () => await transactionRepository.readTransactionsInDateRange(dateFrom, dateTo),
  });
  return { transactions: query.data, ...query };
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (transaction: TransactionCreate) => {
      return await transactionRepository.createTransaction(transaction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    }
  });
  return { createTransaction: mutateAsync, isError };
}

export const useCreateManyTransactions = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (transactions: TransactionCreate[]) => {
      return await transactionRepository.createManyTransactions(transactions);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    }
  });
  return { createManyTransactions: mutateAsync, isError };
}