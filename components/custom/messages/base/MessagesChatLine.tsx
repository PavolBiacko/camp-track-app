import MessagesAvatar from '@/components/custom/messages/base/MessagesAvatar'
import MessageBubble from '@/components/custom/messages/base/MessagesBubble'
import { MessagesChatLineProps } from '@/types/messages'
import { View } from 'react-native'

const MessagsChatLine = (props: MessagesChatLineProps) => {
  const { id: senderId, firstName, lastName } = props.sender || {}
  const isCurrentUser = props.userId === senderId

  const avatar = (
    <MessagesAvatar
      key={`avatar-${props.messageId}`}
      firstName={firstName}
      lastName={lastName}
    />
  );
  const bubble = (
    <MessageBubble
      key={`bubble-${props.messageId}`}
      firstName={firstName}
      lastName={lastName}
      createdAt={props.createdAt}
      content={props.content}
      isCurrentUser={isCurrentUser}
    />
  );

  return (
    <View className={`flex-row my-2 gap-2 items-end ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {isCurrentUser ? [bubble] : [avatar, bubble]}
    </View>
  )
}

export default MessagsChatLine