import { financeRepository } from "@/repositories/financeRepository";
import { SingleCashActionInput } from "@/types/finance";
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
