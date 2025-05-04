import { activityRepository } from "@/repositories/activityRepository";
import { ActivityCreate, ActivityUpdate } from "@/types/models/activities";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useActivitiesByDay = (date: Date) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['activities', date],
    queryFn: async () => await activityRepository.readActivitiesByDate(date),
  });
  return { activities: data, isLoading, isError };
}

export const useActivity = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['activities', id],
    queryFn: async () => await activityRepository.readActivityById(id),
  });
  return { activity: data, isLoading, isError };
}

export const useCreateActivity = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (data: ActivityCreate) => {
      return await activityRepository.createActivity(data);
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
      return await activityRepository.updateActivityById(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['activities', id] });
    }
  });
  return { updateActivity: mutateAsync, isError };
}

export const useDeleteActivity = (id: number) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async () => {
      return await activityRepository.deleteActivityById(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    }
  });
  return { deleteActivity: mutateAsync, isPending, isError };
}