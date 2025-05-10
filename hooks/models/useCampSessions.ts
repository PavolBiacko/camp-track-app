import { campSessionRepository } from "@/repositories/campSessionRepository";
import { CampSessionCreate, CampSessionUpdate } from "@/types/models/campSessions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useManyCampSessionsGrouped = () => {
  const query = useQuery({
    queryKey: ['campSessionsGroupped'],
    queryFn: async () => await campSessionRepository.readAllCampSessionsGrouped(),
  });
  return { campSessionsGrouped: query.data, ...query };
}

export const useManyCampSessions = () => {
  const query = useQuery({
    queryKey: ['campSessions'],
    queryFn: async () => await campSessionRepository.readAllCampSessions(),
  });
  return { campSessions: query.data, ...query };
}

export const useCampSession = (id: number) => {
  const query = useQuery({
    queryKey: ['campSessions', id],
    queryFn: async () => await campSessionRepository.readCampSessionById(id),
    enabled: !!id,
  });
  return { campSession: query.data, ...query };
}

export const useUpdateCampSession = (id: number) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (data: CampSessionUpdate) => {
      return await campSessionRepository.updateCampSessionById(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campSessionsGroupped'] });
      queryClient.invalidateQueries({ queryKey: ['campSessions'] });
      queryClient.invalidateQueries({ queryKey: ['campSessions', id] });
      queryClient.invalidateQueries({ queryKey: ['groupChats'] });
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
      queryClient.invalidateQueries({ queryKey: ['campSessionsGroupped'] });
      queryClient.invalidateQueries({ queryKey: ['campSessions'] });
      queryClient.invalidateQueries({ queryKey: ['groupChats'] });
    },
  });
  return { createCampSession: mutateAsync, isError };
}