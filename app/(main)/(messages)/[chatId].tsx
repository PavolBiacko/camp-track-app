import CustomButton from '@/components/custom/CustomButton';
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
        title: groupChat.name ?? "(Bez názvu)",
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

  return (
    <View className="flex-1">
      <MessagesChatContent />
      <MessagesChatFooter />
    </View>
  )
}

export default Messages