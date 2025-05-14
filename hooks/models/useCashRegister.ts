import { cashRegisterRepository } from "@/repositories/cashRegisterRepository";
import { CashRegisterRecord } from "@/types/finance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCashRegisterByLeader = (leaderId: string) => {
  const query = useQuery({
    queryKey: ['cashRegister', leaderId],
    queryFn: async () => await cashRegisterRepository.readCashRegisterByLeader(leaderId),
  });
  return { cashRegister: query.data, ...query };
}

export const useUpdateCashRegisterByLeader = (leaderId: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (counts: CashRegisterRecord) => {
      return await cashRegisterRepository.updateCashRegisterByLeader(leaderId, counts);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cashRegister', leaderId] });
    }
  });
  return { updateCashRegister: mutateAsync, isError };
}

export const useCreateCashRegister = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (groupId: number) => {
      return await cashRegisterRepository.createEmptyCashRegisterRecordsForGroup(groupId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cashRegister'] });  // maybe here should retrieve leaderId from groupId
    }
  });
  return { createEmptyCashRegisterByGroup: mutateAsync, isError };
}