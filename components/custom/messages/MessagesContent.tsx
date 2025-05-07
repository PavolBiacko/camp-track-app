import Loading from '@/components/custom/Loading';
import MessagesBox from '@/components/custom/messages/base/MessagesBox';
import { useManyGroupChats } from '@/hooks/models/useGroupChats';
import { isDateRangeActive } from '@/utils/dates';
import { ScrollView, Text, View } from 'react-native';

const MessagesContent = () => {
  const { groupChats, isLoading, isError } = useManyGroupChats();

  return (
    <View className='h-[72%]'>
      <View className='flex-row justify-center items-center bg-background-300 border-y border-outline-500 gap-5 py-2'>
        <Text className='text-typography-950 text-2xl text-center font-pbold'>
          Zvyšné turnusy
        </Text>
      </View>
      {!groupChats || isLoading || isError
        ? <Loading showText={false} />
        : <ScrollView contentContainerClassName="justify-center items-center py-3" className='w-full h-full'>
          {groupChats
            .filter((groupChat) => !isDateRangeActive(groupChat.sessionRange))
            .map((groupChat) => (
              <MessagesBox
                key={groupChat.id}
                name={groupChat.name}
                range={groupChat.sessionRange}
              />
            ))}
        </ScrollView>}
    </View>
  )
}

export default MessagesContent