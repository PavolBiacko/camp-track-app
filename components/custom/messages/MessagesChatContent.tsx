import Loading from '@/components/custom/Loading';
import { useManyMessages } from '@/hooks/models/useMessages';
import { UserRoles } from '@/types/enums/roles';
import { MessageComplex } from '@/types/models/messages';
import { FlatList, Text, View } from 'react-native';

const groupMessages: MessageComplex[] = [
  {
    id: 1,
    groupChatId: 1,
    sender: {
      id: '03818a3f-4f80-47c9-8020-1784b1f8c249',
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      birthDate: null,
      role: UserRoles.GROUP_LEADER,
      createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    content: 'Hello, how are you?',
    createdAt: new Date('2023-01-01T00:00:00Z'),
  },
  {
    id: 2,
    groupChatId: 1,
    sender: {
      id: '433178ca-925a-434d-b383-2f11e224e11e',
      email: 'palko.biacko@gmail.com',
      firstName: 'Pavol',
      lastName: 'Biačko',
      birthDate: null,
      role: UserRoles.CAMP_LEADER,
      createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    content: 'I am fine, thank you! How about you?',
    createdAt: new Date('2023-01-01T00:00:00Z'),
  },
  {
    id: 3,
    groupChatId: 1,
    sender: {
      id: '02115bef-93df-431a-8148-7acff36620a4',
      email: 'hello.kitty@gmail.com',
      firstName: 'Hello',
      lastName: 'Kitty',
      birthDate: null,
      role: UserRoles.GROUP_LEADER,
      createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    content: 'I am doing great! Thanks for asking.',
    createdAt: new Date('2023-01-01T00:00:00Z'),
  },
  {
    id: 4,
    groupChatId: 1,
    sender: {
      id: '433178ca-925a-434d-b383-2f11e224e11e',
      email: 'palko.biacko@gmail.com',
      firstName: 'Pavol',
      lastName: 'Biačko',
      birthDate: null,
      role: UserRoles.CAMP_LEADER,
      createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    content: 'What are you up to today?',
    createdAt: new Date('2023-01-01T00:00:00Z'),
  },
  {
    id: 5,
    groupChatId: 1,
    sender: {
      id: '03818a3f-4f80-47c9-8020-1784b1f8c249',
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      birthDate: null,
      role: UserRoles.GROUP_LEADER,
      createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    content: 'Just chilling, maybe some hiking later. You?',
    createdAt: new Date('2023-01-01T00:05:00Z'),
  },
  {
    id: 6,
    groupChatId: 1,
    sender: {
      id: '02115bef-93df-431a-8148-7acff36620a4',
      email: 'hello.kitty@gmail.com',
      firstName: 'Hello',
      lastName: 'Kitty',
      birthDate: null,
      role: UserRoles.GROUP_LEADER,
      createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    content: 'Planning a movie night! Any suggestions?',
    createdAt: new Date('2023-01-01T00:10:00Z'),
  },
  {
    id: 7,
    groupChatId: 1,
    sender: {
      id: '433178ca-925a-434d-b383-2f11e224e11e',
      email: 'palko.biacko@gmail.com',
      firstName: 'Pavol',
      lastName: 'Biačko',
      birthDate: null,
      role: UserRoles.CAMP_LEADER,
      createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    content: 'How about "The Shawshank Redemption"? Classic!',
    createdAt: new Date('2023-01-01T00:15:00Z'),
  },
  {
    id: 8,
    groupChatId: 1,
    sender: {
      id: '03818a3f-4f80-47c9-8020-1784b1f8c249',
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      birthDate: null,
      role: UserRoles.GROUP_LEADER,
      createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    content: 'Love that one! Count me in.',
    createdAt: new Date('2023-01-01T00:20:00Z'),
  },
  {
    id: 9,
    groupChatId: 1,
    sender: {
      id: '02115bef-93df-431a-8148-7acff36620a4',
      email: 'hello.kitty@gmail.com',
      firstName: 'Hello',
      lastName: 'Kitty',
      birthDate: null,
      role: UserRoles.GROUP_LEADER,
      createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    content: 'Cool, let’s do it at 8 PM. Bring snacks!',
    createdAt: new Date('2023-01-01T00:25:00Z'),
  },
  {
    id: 10,
    groupChatId: 1,
    sender: {
      id: '433178ca-925a-434d-b383-2f11e224e11e',
      email: 'palko.biacko@gmail.com',
      firstName: 'Pavol',
      lastName: 'Biačko',
      birthDate: null,
      role: UserRoles.CAMP_LEADER,
      createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    content: 'I’ll bring popcorn and soda.',
    createdAt: new Date('2023-01-01T00:30:00Z'),
  },
  {
    id: 11,
    groupChatId: 1,
    sender: {
      id: '03818a3f-4f80-47c9-8020-1784b1f8c249',
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      birthDate: null,
      role: UserRoles.GROUP_LEADER,
      createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    content: 'Perfect! I’ve got some chips.',
    createdAt: new Date('2023-01-01T00:35:00Z'),
  },
  {
    id: 12,
    groupChatId: 1,
    sender: {
      id: '02115bef-93df-431a-8148-7acff36620a4',
      email: 'hello.kitty@gmail.com',
      firstName: 'Hello',
      lastName: 'Kitty',
      birthDate: null,
      role: UserRoles.GROUP_LEADER,
      createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    content: 'Awesome, see you all tonight!',
    createdAt: new Date('2023-01-01T00:40:00Z'),
  },
  {
    id: 13,
    groupChatId: 1,
    sender: {
      id: '433178ca-925a-434d-b383-2f11e224e11e',
      email: 'palko.biacko@gmail.com',
      firstName: 'Pavol',
      lastName: 'Biačko',
      birthDate: null,
      role: UserRoles.CAMP_LEADER,
      createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    content: 'Can we add another movie? Maybe a comedy?',
    createdAt: new Date('2023-01-01T00:45:00Z'),
  },
  {
    id: 14,
    groupChatId: 1,
    sender: {
      id: '03818a3f-4f80-47c9-8020-1784b1f8c249',
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      birthDate: null,
      role: UserRoles.GROUP_LEADER,
      createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    content: 'Sure, how about "The Grand Budapest Hotel"?',
    createdAt: new Date('2023-01-01T00:50:00Z'),
  },
];

const MessagesChatContent = ({ chatId }: { chatId: number }) => {
  const { messages, isLoading, isError, fetchNextPage, hasNextPage } = useManyMessages(chatId);

  if (!messages || isLoading || isError) {
    return <Loading showText={false} containerStyles="flex-1 justify-center items-center" />;
  }

  const flatMessages = messages.pages.flatMap((page) => page) || [];

  // console.log('Messages:', JSON.stringify(flatMessages, null, 2));

  return (
    <FlatList
      data={flatMessages}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="p-4 border-b border-gray-200">
          <Text className="font-pbold text-typography-950">
            {item.sender?.firstName} {item.sender?.lastName}:
          </Text>
          <Text className="text-typography-800">{item.content}</Text>
          <Text className="text-typography-500 text-xs text-right">
            {new Date(item.createdAt).toLocaleTimeString()}
          </Text>
        </View>
      )}
      className="flex-1 w-full"
      inverted // Renders the list from bottom to top
      onEndReached={() => {
        if (hasNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.1}
      initialNumToRender={10} // Render only 10 items initially for performance
      windowSize={5} // Render 5 "windows" of items at a time
      ListFooterComponent={
        hasNextPage ? (
          <Loading showText={false} containerStyles="py-4" />
        ) : null
      }
      // Optional: Maintain scroll position when new messages arrive
      maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
    />
  )
}

export default MessagesChatContent