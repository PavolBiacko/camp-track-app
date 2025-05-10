import EmptyScreenMessage from '@/components/custom/EmptyScreenMessage';
import MessagesBox from '@/components/custom/messages/base/MessagesBox';
import { MessagesHeaderProps } from '@/types/messages';
import { isDateRangeActive } from '@/utils/dates';
import { Text, View } from 'react-native';

const MessagesHeader = ({ groupChats }: MessagesHeaderProps) => {
  return (
    <View className='h-[28%]'>
      <View className='flex-row justify-center items-center bg-background-300 border-y border-outline-500 gap-5 py-2'>
        <Text className='text-typography-950 text-2xl text-center font-pbold'>
          Prebiehajúci turnus
        </Text>
      </View>
      <View className="flex-1 justify-center items-center">
        {(() => {
          const activeGroupChat = groupChats.find((groupChat) => isDateRangeActive(groupChat.sessionRange));
          if (!activeGroupChat) {
            return <EmptyScreenMessage text='Aktuálne neprebieha turnus.' />;
          }
          return (
            <MessagesBox
              id={activeGroupChat.id}
              name={activeGroupChat.name}
              range={activeGroupChat.sessionRange}
            />
          );
        })()}
      </View>
    </View>
  );
};

export default MessagesHeader;