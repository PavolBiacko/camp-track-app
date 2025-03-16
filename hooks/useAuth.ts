import authRepository from "@/repositories/authRepository";

export const useAuth = async () => {
  return await authRepository.whoami();
}
