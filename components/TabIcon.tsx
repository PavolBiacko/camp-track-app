import { TabIconProps } from "@/types/tabs"
import { FC } from "react"
import { Image, Text, View } from "react-native"

export const TabIcon: FC<TabIconProps> = ({ icon, color, shownLabel, focused }) => {
  return (
    <View className="items-center justify-center gap-2 mt-7">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-7 h-7"
      />
      <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs text-center w-full h-full`} style={{ color: color }}>
        {shownLabel}
      </Text>
    </View>
  )
}
