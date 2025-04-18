import { financeRepository } from "@/repositories/financeRepository";
import { useQuery } from "@tanstack/react-query";

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