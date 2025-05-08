import { messagesRepository } from "@/repositories/messagesRepository";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useManyMessages = (chatId: number) => {
  const query = useInfiniteQuery({
    queryKey: ['messagesq', chatId],
    queryFn: async ({ pageParam = 0 }) => {
      return await messagesRepository.readManyMessagesPaginated(chatId, pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < messagesRepository.PAGE_SIZE) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
  });
  return { messages: query.data, ...query };
}