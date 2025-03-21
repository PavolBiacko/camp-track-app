import authRepository from "@/repositories/authRepository";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: () => authRepository.whoami(),
  });
}
