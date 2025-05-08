import { mapDateTimeToString } from '@/mappers/datetime'
import { MessagesBubbleProps } from '@/types/messages'
import { Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

const MessagesBubble = ({ firstName, lastName, createdAt, content, isCurrentUser }: MessagesBubbleProps) => {
  const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Unknown User'

  return (
    <View>
      <View className='flex-row justify-between'>
        <Text
          className={
            twMerge(
              "text-typography-950 text-sm font-psemibold",
              isCurrentUser ? 'text-right' : 'text-left'
            )
          }>
          {isCurrentUser ? "Ja" : fullName}
        </Text>
        <Text
          className={
            twMerge(
              "text-typography-600 text-sm font-psemibold",
              isCurrentUser ? 'text-right' : 'text-left'
            )
          }>
          {mapDateTimeToString(createdAt, "time")}
        </Text>
      </View>
      <View
        className={
          twMerge(
            "max-w-[36vh] border rounded-xl py-2 my-2",
            isCurrentUser ? 'bg-secondary-300 border-secondary-700' : 'bg-tertiary-300 border-tertiary-700'
          )
        }>
        <Text className="text-typography-950 text-lg font-psemibold mt-1 px-3">
          {content}
        </Text>
      </View>
    </View>
  )
}

export default MessagesBubble