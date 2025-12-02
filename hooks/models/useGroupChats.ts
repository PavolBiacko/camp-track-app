import { groupChatRepository } from "@/repositories/groupChatRepository";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useManyGroupChats = () => {
  const query = useQuery({
    queryKey: ["groupChats"],
    queryFn: async () => await groupChatRepository.readManyGroupChats(),
  });
  return { groupChats: query.data, ...query };
};

export const useGroupChatById = (id: number) => {
  const query = useQuery({
    queryKey: ["groupChats", id],
    queryFn: async () => await groupChatRepository.readGroupChatById(id),
  });
  return { groupChat: query.data, ...query };
};

export const useUpdateGroupChat = (id: number) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (data: any) => {
      return await groupChatRepository.updateGroupChat(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupChats"] });
      queryClient.invalidateQueries({ queryKey: ["groupChats", id] });
    },
  });
  return { updateGroupChat: mutateAsync, isError };
};
