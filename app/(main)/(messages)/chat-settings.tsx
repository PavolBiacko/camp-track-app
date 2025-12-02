import Loading from "@/components/custom/Loading";
import MessagesSettingsForm from "@/components/custom/messages/MessagesSettingsForm";
import {
  useGroupChatById,
  useUpdateGroupChat,
} from "@/hooks/models/useGroupChats";
import { GroupChatParams } from "@/types/messages";
import { GroupChatUpdate } from "@/types/models/groupChats";
import { groupChatSchema } from "@/validation/messages";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, ScrollView } from "react-native";

const ChatSettings = () => {
  const params = useLocalSearchParams<GroupChatParams>();
  const chatId = parseInt(params.chatId);

  const { groupChat, isLoading, isError } = useGroupChatById(chatId);
  const { updateGroupChat } = useUpdateGroupChat(chatId);

  const handleUpdateChat = async (data: GroupChatUpdate) => {
    // Data are valid, checked with Zod
    try {
      await updateGroupChat(data);
      Alert.alert(
        "Hotovo!",
        "Nastavenia skupinového četu boli úspešne upravené."
      );
      router.back();
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  if (!groupChat || isLoading || isError) {
    return <Loading showText={true} />;
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="px-4">
      <MessagesSettingsForm<GroupChatUpdate>
        title={"Nastavenia"}
        fields={[{ title: "Názov četu", formDataTypeKey: "name" }]}
        initialValues={{
          name: groupChat.name,
        }}
        validationSchema={groupChatSchema}
        onSubmit={handleUpdateChat}
        buttonText="Uložiť zmeny"
      />
    </ScrollView>
  );
};

export default ChatSettings;
