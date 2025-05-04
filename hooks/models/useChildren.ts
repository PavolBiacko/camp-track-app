import { childRepository } from "@/repositories/childRepository";
import { useQuery } from "@tanstack/react-query";

export const useManyChildren = () => {
  const mutation = useQuery({
    queryKey: ['children'],
    queryFn: async () => await childRepository.readManyChildren(),
  });
  return { children: mutation.data, ...mutation };
}