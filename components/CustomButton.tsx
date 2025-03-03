import { CustomButtonProps } from '@/types/types'
import { FC } from 'react'
import { Text, TouchableOpacity } from 'react-native'

const CustomButton: FC<CustomButtonProps> = ({ title, handlePress, isPrimary, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={
        `${isPrimary ? "bg-secondary" : "bg-gray"}
         ${containerStyles} ${isLoading ? "opacity-50" : ""}
         rounded-3xl min-h-[62px] justify-center items-center border-red-500`
      }
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton