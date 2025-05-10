import EmptyScreenMessage from '@/components/custom/EmptyScreenMessage'
import Loading from '@/components/custom/Loading'
import MessagesContent from '@/components/custom/messages/MessagesContent'
import MessagesHeader from '@/components/custom/messages/MessagesHeader'
import { useManyGroupChats } from '@/hooks/models/useGroupChats'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Messages = () => {
  const { groupChats, isLoading, isError } = useManyGroupChats();

  if (!groupChats || isLoading || isError) {
    return <Loading showText={true} />
  }

  if (groupChats.length === 0) {
    return (
      <SafeAreaView className='justify-center h-full'>
        <EmptyScreenMessage text='Neexistuju žiadne relevantné skupinové čety.' />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='justify-center h-full'>
      <MessagesHeader groupChats={groupChats} />
      <MessagesContent groupChats={groupChats} />
    </SafeAreaView>
  )
}

export default Messages