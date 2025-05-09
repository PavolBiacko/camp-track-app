import { messagesRepository } from "@/repositories/messagesRepository";
import { MessageCreate } from "@/types/models/messages";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useFetchMessages = (chatId: number) => {
  const query = useInfiniteQuery({
    queryKey: ['messages', chatId],
    queryFn: async ({ pageParam = 0 }) => {
      return await messagesRepository.fetchMessages(chatId, pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < messagesRepository.PAGE_SIZE) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
  });
  return { messages: query.data, ...query };
}

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: MessageCreate) => {
      return await messagesRepository.sendMessage(message);
    },
    onSuccess: (newMessage) => {
      // Optionally, you can optimistically update the cache here.
      // However, since we're using real-time subscriptions in useManyMessages,
      // the new message will be added automatically via the subscription.
      // If you want to avoid waiting for the subscription, you can uncomment the following:
      /*
      queryClient.setQueryData(['messages', newMessage.groupChatId], (oldData: any) => {
        if (!oldData) return { pages: [[newMessage]], pageParams: [0] };
        const updatedPages = [...oldData.pages];
        updatedPages[0] = [newMessage, ...updatedPages[0]];
        return { ...oldData, pages: updatedPages };
      });
      */
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      // Optionally, show a toast or notification to the user
    },
  });
};