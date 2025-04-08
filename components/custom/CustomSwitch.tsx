import { useSwitchColors } from '@/hooks/useSwitchColors'
import { CustomSwitchProps } from '@/types/custom/switch'
import { useColorScheme } from 'nativewind'
import { Switch, Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

const CustomSwitch = (props: CustomSwitchProps) => {
  const { colorScheme } = useColorScheme();
  const { thumbColorOff, thumbColorOn, trackColorOff, trackColorOn } = useSwitchColors(colorScheme);

  return (
    <View className="w-full items-center mt-6">
      <View className="relative w-full items-center">
        {/* Center the Switch */}
        <Switch
          value={props.value}
          onValueChange={props.onValueChange}
          trackColor={{ true: trackColorOn, false: trackColorOff }}
          thumbColor={props.value ? thumbColorOn : thumbColorOff}
          style={{ backgroundColor: "transparent" }}
        />
        {/* Left text, positioned just left of the Switch */}
        <Text className={
          twMerge(
            "absolute right-1/2 mr-8 top-1/2 -translate-y-[10px]",
            "text-typography-950 text-base font-psemibold",
            props.textStyles
          )}>
          {props.onFalseText}
        </Text>
        {/* Right text, positioned just right of the Switch */}
        <Text className={
          twMerge(
            "absolute left-1/2 ml-8 top-1/2 -translate-y-[10px]",
            "text-typography-950 text-base font-psemibold",
            props.textStyles
          )}>
          {props.onTrueText}
        </Text>
      </View>
    </View>
  )
}

export default CustomSwitch