import { CustomButtonProps } from '@/types/button'
import { FC } from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'

const CustomButton: FC<CustomButtonProps> = ({
  title,
  icon,
  iconPosition = "left",
  isPrimary = false,
  handlePress,
  containerStyles,
  textStyles,
  iconStyles,
  isLoading,
}) => {
  const hasBoth = !!title && !!icon;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={
        twMerge(
          isPrimary ? "bg-secondary" : "bg-gray",
          isLoading ? "opacity-50" : "",
          containerStyles,
          "rounded-3xl min-h-[62px] justify-center items-center",
          hasBoth ? "flex-row gap-3" : ""
        )
      }
      disabled={isLoading}
    >
      {icon && iconPosition === "left" && <Image source={icon} resizeMode="contain" className={iconStyles} />}
      {title && <Text className={twMerge("text-primary font-psemibold text-lg", textStyles)}>{title}</Text>}
      {icon && iconPosition === "right" && <Image source={icon} resizeMode="contain" className={iconStyles} />}
    </TouchableOpacity>
  )
}

export default CustomButton