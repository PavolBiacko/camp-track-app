import { campSessionRepository } from "@/repositories/campSessionRepository";
import { CampSessionCreate, CampSessionUpdate } from "@/types/models/campSessions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useManyCampSessionsGrouped = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['campSessions'],
    queryFn: async () => await campSessionRepository.readAllCampSessionsGrouped(),
  });
  return { campSessionsGrouped: data, isLoading, isError };
}

export const useManyCampSessions = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['campSessions'],
    queryFn: async () => await campSessionRepository.readAllCampSessions(),
  });
  return { campSessions: data, isLoading, isError };
}

export const useCampSession = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['campSessions', id],
    queryFn: async () => await campSessionRepository.readCampSessionById(id),
    enabled: !!id,
  });
  return { campSession: data, isLoading, isError };
}

export const useUpdateCampSession = (id: number) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (data: CampSessionUpdate) => {
      return await campSessionRepository.updateCampSessionById(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campSessions'] });
      queryClient.invalidateQueries({ queryKey: ['campSessions', id] });
    },
  });
  return { updateCampSession: mutateAsync, isError };
}

export const useCreateCampSession = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (data: CampSessionCreate) => {
      return await campSessionRepository.createCampSessionById(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campSessions'] });
    },
  });
  return { createCampSession: mutateAsync, isError };
}