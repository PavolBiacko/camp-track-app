import { messagesRepository } from "@/repositories/messagesRepository";
import { MessageCreate } from "@/types/models/messages";
import { keepPreviousData, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useFetchMessages = (chatId: number) => {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: ['messages', chatId],
    queryFn: async ({ pageParam }) => {
      const messages = await messagesRepository.fetchMessages(chatId, pageParam);
      return messages;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0 || lastPage.length < messagesRepository.PAGE_SIZE) {
        return undefined;
      }
      const nextPage = allPages.length;
      return nextPage;
    },
    initialPageParam: 0,
    placeholderData: keepPreviousData,
  });

  // Real-time subscription for new messages
  messagesRepository.createSubscribtion(queryClient, chatId);

  return { messages: query.data, ...query };
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (message: MessageCreate) => {
      return await messagesRepository.sendMessage(message);
    },
    onSuccess: (newMessage) => {
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

  return { sendMessage: mutateAsync, isError };
};