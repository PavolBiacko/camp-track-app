import { groupChatRepository } from "@/repositories/groupChatRepository";
import { useQuery } from "@tanstack/react-query";

export const useManyGroupChats = () => {
  const query = useQuery({
    queryKey: ['groupChats'],
    queryFn: async () => await groupChatRepository.readManyGroupChats(),
  });
  return { groupChats: query.data, ...query };
}

export const useGroupChatById = (id: number) => {
  const query = useQuery({
    queryKey: ['groupChats', id],
    queryFn: async () => await groupChatRepository.readGroupChatById(id),
  });
  return { groupChat: query.data, ...query };
}