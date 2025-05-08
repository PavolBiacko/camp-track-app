import { Avatar, AvatarFallbackText } from '@/components/ui/avatar'
import { MessagesAvatarProps } from '@/types/messages'

const MessagesAvatar = ({ firstName, lastName }: MessagesAvatarProps) => {
  const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Unknown User'

  return (
    <Avatar size="md" className="bg-background-500 border-2 border-outline-700 rounded-full mb-2">
      <AvatarFallbackText className="text-typography-950 text-lg font-psemibold pt-1">
        {fullName}
      </AvatarFallbackText>
    </Avatar>
  )
}

export default MessagesAvatar