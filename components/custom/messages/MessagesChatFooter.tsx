import CustomButton from '@/components/custom/CustomButton';
import FormField from '@/components/custom/FormField';
import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors';
import { icons } from '@/constants';
import { useSendMessage } from '@/hooks/models/useMessages';
import { useAuth } from '@/hooks/useAuth';
import { MessagesChatData, MessagesChatFooterProps } from '@/types/messages';
import { getMessageObject } from '@/utils/messages';
import { getNumberOfLines } from '@/utils/strings';
import { getFormFieldHeightBasedOnLines } from '@/utils/ui';
import { messagesSchema } from '@/validation/messages';
import { zodResolver } from '@hookform/resolvers/zod';
import { useColorScheme } from 'nativewind';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';

const MessagesChatFooter = (props: MessagesChatFooterProps) => {
  const { user } = useAuth();
  const { colorScheme } = useColorScheme();
  const { sendMessage } = useSendMessage();

  const { control, register, handleSubmit, watch, reset } = useForm<MessagesChatData>({
    defaultValues: { message: "" },
    resolver: zodResolver(messagesSchema),
  });

  const numberOfLines = getNumberOfLines(watch("message"));
  const height = getFormFieldHeightBasedOnLines(numberOfLines, 8);  // h-40 and h-48 are problematic sometimes

  const onSubmit = async (data: MessagesChatData) => {
    const messageData = getMessageObject(props.chatId, user?.id!, data.message);
    await sendMessage(messageData);
    reset();
  };

  return (
    <KeyboardAvoidingView className={`flex-row w-full h-${height} items-center justify-center border-t border-outline-500`}>
      <View className='w-[80%] justify-center items-center'>
        <FormField
          control={control}
          register={register}
          formDataTypeKey='message'
          placeholder='Správa'
          otherStyles='w-[90%]'
          isMultine={true}
          numberOfLines={numberOfLines}
          autoCapitalize='none'
        />
      </View>
      <View className='w-[20%] h-full justify-center items-center'>
        <CustomButton
          icon={icons.sendMessage}
          action='background'
          variant='combined'
          handlePress={handleSubmit(onSubmit)}
          iconStyles='w-8 h-8'
          iconTintColor={getRGBColor('primary', '500', colorScheme)}
          containerStyles='w-14 h-14 rounded-full mr-3'
          isDisabled={watch("message").length === 0}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default MessagesChatFooter