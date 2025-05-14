import { usersRepository } from "@/repositories/userRepository";
import { UserIdWithRole } from "@/types/models/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useManyUsers = (sessionId: number | null) => {
  const query = useQuery({
    queryKey: ['users', sessionId],
    queryFn: async () => await usersRepository.readManyUsers(sessionId),
  });
  return { users: query.data, ...query };
}

export const useUserById = (leaderId: string | null) => {
  const query = useQuery({
    queryKey: ['users', leaderId],
    queryFn: async () => await usersRepository.readUserById(leaderId),
  });
  return { user: query.data, ...query };
}

export const useChangeUserRole = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (user: UserIdWithRole) => {
      await usersRepository.changeUserRole(user.id, user.role)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
  return { changeUserRole: mutateAsync, isError };
}