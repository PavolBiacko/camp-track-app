import authRepository from "@/repositories/authRepository";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['auth'],
    queryFn: () => authRepository.whoami(),
  });
  return { user: data, isLoading, isError };
}
