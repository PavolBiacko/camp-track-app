import { TabIconProps } from "@/types/tabs"
import { FC } from "react"
import { Image, Text, View } from "react-native"

const TabIcon: FC<TabIconProps> = (props) => {
  return (
    <View className="items-center justify-center gap-2 mt-7">
      <Image
        source={props.icon}
        resizeMode="contain"
        tintColor={props.color}
        className="w-7 h-7"
      />
      <Text className={`${props.focused ? "font-psemibold" : "font-pregular"} text-xs text-center w-full h-full`} style={{ color: props.color }}>
        {props.shownLabel}
      </Text>
    </View>
  )
}

export default TabIcon
