import { TabIconProps } from "@/types/types"
import { FC } from "react"
import { Image, Text, View } from "react-native"

export const TabIcon: FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2 mt-7">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-5 h-5"
      />
      <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs text-center w-full h-full`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}
