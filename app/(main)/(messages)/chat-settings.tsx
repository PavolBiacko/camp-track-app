import Loading from '@/components/custom/Loading';
import { useGroupChatById } from '@/hooks/models/useGroupChats';
import { GroupChatParams } from '@/types/messages';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const ChatSettings = () => {
  const params = useLocalSearchParams<GroupChatParams>();
  const chatId = parseInt(params.chatId);
  const { groupChat, isLoading, isError } = useGroupChatById(chatId);

  if (!groupChat || isLoading || isError) {
    return <Loading showText={true} />;
  }

  return (
    <View className='flex-1 justify-center items-center'>
      <Text>ChatSettings</Text>
    </View>
  )
}

export default ChatSettings