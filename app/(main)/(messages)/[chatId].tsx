import CustomButton from '@/components/custom/CustomButton';
import Loading from '@/components/custom/Loading';
import MessagesChatContent from '@/components/custom/messages/MessagesChatContent';
import MessagesChatFooter from '@/components/custom/messages/MessagesChatFooter';
import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors';
import { icons } from '@/constants';
import { useGroupChatById } from '@/hooks/models/useGroupChats';
import { GroupChatParams } from '@/types/messages';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { View } from 'react-native';

const Messages = () => {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();
  const params = useLocalSearchParams<GroupChatParams>();
  const chatId = parseInt(params.chatId);

  const { groupChat, isLoading, isError } = useGroupChatById(chatId);

  // setting the header title
  useEffect(() => {
    if (groupChat) {
      navigation.setOptions({
        title: String(groupChat.id) ?? "(Bez názvu)",
        headerRight: () => (
          <CustomButton
            icon={icons.settings}
            action="background"
            variant="combined"
            handlePress={() => router.push({ pathname: "/(main)/(messages)/chat-settings", params: { chatId } })}
            iconStyles="w-8 h-8"
            iconTintColor={getRGBColor("typography", "700", colorScheme)}
            containerStyles="w-12 h-12 rounded-full"
          />
        )
      });
    }
  }, [groupChat]);

  if (!groupChat || isLoading || isError) {
    return <Loading showText={true} />;
  }

  return (
    <View className="flex-1">
      <MessagesChatContent chatId={chatId} />
      <MessagesChatFooter />
    </View>
  )
}

export default Messages