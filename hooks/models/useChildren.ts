import { childRepository } from "@/repositories/childRepository";
import { ChildCreate, ChildUpdate } from "@/types/models/children";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useManyChildren = () => {
  const query = useQuery({
    queryKey: ['children'],
    queryFn: async () => await childRepository.readManyChildren(),
  });
  return { children: query.data, ...query };
}

export const useChild = (id: string) => {
  const query = useQuery({
    queryKey: ['children', id],
    queryFn: async () => await childRepository.readChildById(id),
  });
  return { child: query.data, ...query };
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

export const useUpdateChild = (id: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (data: ChildUpdate) => {
      return await childRepository.updateChild(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children'] });
      queryClient.invalidateQueries({ queryKey: ['children', id] });
    }
  });
  return { updateChild: mutateAsync, isError };
}

export const useDeleteChild = (id: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async () => {
      return await childRepository.deleteChild(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children'] });
    }
  });
  return { deleteChild: mutateAsync, isPending, isError };
}