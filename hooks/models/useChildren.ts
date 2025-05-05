import { childRepository } from "@/repositories/childRepository";
import { ChildCreate } from "@/types/models/children";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useManyChildren = () => {
  const mutation = useQuery({
    queryKey: ['children'],
    queryFn: async () => await childRepository.readManyChildren(),
  });
  return { children: mutation.data, ...mutation };
}

export const useChild = (id: string) => {
  const mutation = useQuery({
    queryKey: ['children', id],
    queryFn: async () => await childRepository.readChildById(id),
  });
  return { child: mutation.data, ...mutation };
}

export const useCreateChild = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (data: ChildCreate) => {
      return await childRepository.createChild(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children'] });
    }
  });
  return { createChild: mutateAsync, isError };
}