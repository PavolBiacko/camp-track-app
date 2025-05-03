import { EmptyScreenMessageProps } from '@/types/custom/screen'
import { Text, View } from 'react-native'

const EmptyScreenMessage = (props: EmptyScreenMessageProps) => {
  return (
    <View className="flex-1 justify-center items-center h-full">
      <Text className="text-typography-500 text-center text-2xl font-pregular mx-5">
        {props.text}
      </Text>
    </View>
  )
}

export default EmptyScreenMessage