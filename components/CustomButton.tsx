import { CustomButtonProps } from '@/types/types'
import { FC } from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { twMerge } from 'tailwind-merge'

const CustomButton: FC<CustomButtonProps> = ({ title, handlePress, isPrimary, containerStyles, textStyles, icon, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={
        twMerge(
          isPrimary ? "bg-secondary" : "bg-gray",
          isLoading ? "opacity-50" : "",
          containerStyles,
          "rounded-3xl min-h-[62px] justify-center items-center"
        )
      }
      disabled={isLoading}
    >
      {/* <Image
        source={icon}
        resizeMode="contain"
        className="w-6 h-6"
      /> */}
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton