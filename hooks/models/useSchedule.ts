import { scheduleRepository } from "@/repositories/scheduleRepository";
import { ActivityCreate, ActivityUpdate } from "@/types/models/activities";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useActivitiesByDay = (date: Date) => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['activities', date],
    queryFn: async () => await scheduleRepository.readActivitiesByDate(date),
  });
  return { activities: data, isFetching, isError };
}

export const useActivity = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['activities', id],
    queryFn: async () => await scheduleRepository.readActivityById(id),
  });
  return { activity: data, isLoading, isError };
}

export const useCreateActivity = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (data: ActivityCreate) => {
      return await scheduleRepository.createActivity(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    }
  });
  return { createActivity: mutateAsync, isError };
}

export const useUpdateActivity = (id: number) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (data: ActivityUpdate) => {
      return await scheduleRepository.updateActivityById(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    }
  });
  return { updateActivity: mutateAsync, isError };
}