import { TabIconProps } from "@/types/types"
import { FC } from "react"
import { Image, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const TabIcon: FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <SafeAreaView className="items-center justify-center gap-2 mb-4">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-7 h-7"
      />
      <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs text-center w-full h-full`} style={{ color: color }}>
        {name}
      </Text>
    </SafeAreaView>
  )
}
