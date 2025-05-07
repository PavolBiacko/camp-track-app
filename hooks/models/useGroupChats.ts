import { groupChatRepository } from "@/repositories/groupsChatRepository";
import { useQuery } from "@tanstack/react-query";

export const useManyGroupChats = () => {
  const query = useQuery({
    queryKey: ['groupChats'],
    queryFn: async () => await groupChatRepository.readManyGroupChats(),
  });
  return { groupChats: query.data, ...query };
}