import { usersRepository } from "@/repositories/usersRepository";
import { useQuery } from "@tanstack/react-query";

export const useManyUsers = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: async () => await usersRepository.readManyUsers(),
  });
  return { users: query.data, ...query };
}