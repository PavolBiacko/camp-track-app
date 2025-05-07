import { activityRepository } from "@/repositories/activityRepository";
import { Activity, ActivityCreate, ActivityUpdate } from "@/types/models/activities";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useActivitiesByDay = (date: Date) => {
  const query = useQuery({
    queryKey: ['activities', date],
    queryFn: async () => await activityRepository.readActivitiesByDate(date),
  });
  return { activities: query.data, ...query };
}

export const useActivity = (id: number) => {
  const query = useQuery({
    queryKey: ['activities', id],
    queryFn: async () => await activityRepository.readActivityById(id),
  });
  return { activity: query.data, ...query };
}

export const useCreateActivity = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (data: ActivityCreate) => {
      return await activityRepository.createActivity(data);
    },
    onSuccess: (activity: Activity) => {
      queryClient.invalidateQueries({ queryKey: ['activities', activity.date] });
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
    onSuccess: (activity: Activity) => {
      queryClient.invalidateQueries({ queryKey: ['activities', activity.date] });
      queryClient.invalidateQueries({ queryKey: ['activities', id] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
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
    onSuccess: (activity: Activity) => {
      queryClient.invalidateQueries({ queryKey: ['activities', activity.date] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    }
  });
  return { deleteActivity: mutateAsync, isPending, isError };
}