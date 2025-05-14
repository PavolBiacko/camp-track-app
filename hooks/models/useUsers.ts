import { usersRepository } from "@/repositories/userRepository";
import { useQuery } from "@tanstack/react-query";

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