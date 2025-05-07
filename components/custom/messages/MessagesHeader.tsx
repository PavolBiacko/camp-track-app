import Loading from '@/components/custom/Loading';
import { useManyGroupChats } from '@/hooks/models/useGroupChats';
import { isDateRangeActive } from '@/utils/dates';
import { Text, View } from 'react-native';
import MessagesBox from './base/MessagesBox';

const MessagesHeader = () => {
  const { groupChats, isLoading, isError } = useManyGroupChats();

  return (
    <View className='h-[28%]'>
      <View className='flex-row justify-center items-center bg-background-300 border-y border-outline-500 gap-5 py-2'>
        <Text className='text-typography-950 text-2xl text-center font-pbold'>
          Prebiehajúci turnus
        </Text>
      </View>
      {!groupChats || isLoading || isError ? (
        <Loading showText={false} />
      ) : (
        <View className="flex-1 justify-center items-center">
          {(() => {
            const activeGroupChat = groupChats.find((groupChat) =>
              isDateRangeActive(groupChat.sessionRange)
            )!;
            return (
              <MessagesBox
                name={activeGroupChat.name}
                range={activeGroupChat.sessionRange}
              />
            );
          })()}
        </View>
      )}
    </View>
  );
};

export default MessagesHeader;