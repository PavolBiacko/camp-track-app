import { financeRepository } from "@/repositories/financeRepository";
import { BuffetPurchaseInput, SingleCashActionInput } from "@/types/finance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSingleCashAction = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (data: SingleCashActionInput) => {
      return await financeRepository.processSingleCashAction(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["cashRegister"] });
      queryClient.invalidateQueries({ queryKey: ["groupAccounts"] });
    },
  });
  return { singleCashAction: mutateAsync, isError };
};

export const useBuffetPurchase = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (data: BuffetPurchaseInput) => {
      return await financeRepository.processBuffetPurchase(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["groupAccounts"] });
    },
  });
  return { buffetPurchase: mutateAsync, isError };
};
