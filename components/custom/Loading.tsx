import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors'
import { LoadingProps } from '@/types/custom/loading'
import { useColorScheme } from 'nativewind'
import { ActivityIndicator, Text, View } from 'react-native'

const Loading = (props: LoadingProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className={`flex-1 justify-center ${props.containerStyles}`}>
      {props.showText && <Text className="text-typography-950 text-2xl font-psemibold self-center">Načítavanie...</Text>}
      <ActivityIndicator size="large" color={getRGBColor("primary", "500", colorScheme)} />
    </View>
  )
}

export default Loading