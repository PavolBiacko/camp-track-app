import Loading from '@/components/custom/Loading';
import MessagesBox from '@/components/custom/messages/base/MessagesBox';
import { useManyCampSessions } from '@/hooks/models/useCampSessions';
import { formatISOLocalToHumanReadable } from '@/utils/dates';
import { ScrollView, Text, View } from 'react-native';

const MessagesContent = () => {
  const { campSessions, isLoading, isError } = useManyCampSessions();

  if (!campSessions || isLoading || isError) {
    return <Loading showText={false} />
  }

  return (
    <View className='h-[72%]'>
      <View className='flex-row justify-center items-center bg-background-300 border-y border-outline-500 gap-5 py-2'>
        <Text className='text-typography-950 text-2xl text-center font-pbold'>
          Zvyšné turnusy
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 10 }} className='w-full h-full'>
        {campSessions.map((session) => (
          <MessagesBox
            key={session.id}
            groupName={`(${formatISOLocalToHumanReadable(session.beginDate)} - ${formatISOLocalToHumanReadable(session.endDate)})`}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default MessagesContent