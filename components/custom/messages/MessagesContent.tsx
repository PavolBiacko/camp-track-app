import EmptyScreenMessage from '@/components/custom/EmptyScreenMessage';
import MessagesBox from '@/components/custom/messages/base/MessagesBox';
import { MessagesContentProps } from '@/types/messages';
import { isDateRangeActive } from '@/utils/dates';
import { ScrollView, Text, View } from 'react-native';

const MessagesContent = ({ groupChats }: MessagesContentProps) => {
  const otherGroupChats = groupChats.filter((groupChat) => !isDateRangeActive(groupChat.sessionRange));

  return (
    <View className='h-[72%]'>
      <View className='flex-row justify-center items-center bg-background-300 border-y border-outline-500 gap-5 py-2'>
        <Text className='text-typography-950 text-2xl text-center font-pbold'>
          Zvyšné turnusy
        </Text>
      </View>
      {otherGroupChats.length === 0 ? (
        <EmptyScreenMessage text="Žiadne neaktívne turnusy." />
      ) : (
        <ScrollView contentContainerClassName="items-center justify-center py-3" className="">
          {otherGroupChats.map((groupChat) => (
            <MessagesBox
              key={groupChat.id.toString()}
              id={groupChat.id}
              name={groupChat.name}
              range={groupChat.sessionRange}
            />
          ))}
        </ScrollView>
      )}
    </View>
  )
}

export default MessagesContent