import Loading from '@/components/custom/Loading';
import MessagesChatLine from '@/components/custom/messages/base/MessagesChatLine';
import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors';
import { useFetchMessages } from '@/hooks/models/useMessages';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from 'nativewind';
import { ActivityIndicator, FlatList } from 'react-native';

const MessagesChatContent = ({ chatId }: { chatId: number }) => {
  const { colorScheme } = useColorScheme();
  const { user } = useAuth()
  const { messages, isLoading, isError, fetchNextPage, hasNextPage } = useFetchMessages(chatId);

  if (!messages || isLoading || isError) {
    return <Loading showText={false} />;
  }

  const flatMessages = messages.pages.flatMap((page) => page);

  return (
    <FlatList
      data={flatMessages}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MessagesChatLine
          key={item.id}
          messageId={item.id}
          userId={user?.id!}  // User known from upper layer, here always defined
          sender={item.sender}
          content={item.content}
          createdAt={new Date(item.createdAt)}
        />
      )}
      className="flex-1 w-full px-3 my-4"
      inverted // Renders the list from bottom to top
      onEndReached={() => {
        if (hasNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.1}
      initialNumToRender={10}
      windowSize={5}
      ListFooterComponent={
        hasNextPage ? (
          <ActivityIndicator size="large" color={getRGBColor("primary", "500", colorScheme)} />
        ) : null
      }
      // Optional: Maintain scroll position when new messages arrive
      maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
    />
  )
}

export default MessagesChatContent