import MessagesContent from '@/components/custom/messages/MessagesContent'
import MessagesHeader from '@/components/custom/messages/MessagesHeader'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Messages = () => {
  return (
    <SafeAreaView className='justify-center h-full'>
      <MessagesHeader />
      <MessagesContent />
    </SafeAreaView>
  )
}

export default Messages