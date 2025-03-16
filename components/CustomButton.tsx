import { colors } from '@/constants'
import { CustomButtonProps } from '@/types/button'
import { FC } from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'

const CustomButton: FC<CustomButtonProps> = ({ iconPosition = "left", ...props }) => {
  const hasBoth = !!props.title && !!props.icon;

  return (
    <TouchableOpacity
      onPress={props.handlePress}
      activeOpacity={0.7}
      className={
        twMerge(
          props.isPrimary ? "bg-primary" : "bg-secondary",
          props.isLoading ? "opacity-50" : "",
          props.containerStyles,
          "rounded-3xl min-h-[62px] justify-center items-center",
          hasBoth ? "flex-row gap-3" : ""
        )
      }
      disabled={props.isLoading}
    >
      {props.isLoading ? (
        <ActivityIndicator size="large" color={colors.light.high} />
      ) : (
        <>
          {props.icon && iconPosition === "left" && <Image source={props.icon} resizeMode="contain" className={props.iconStyles} />}
          {props.title && <Text className={twMerge("text-darkHigh font-psemibold text-lg", props.textStyles)}>{props.title}</Text>}
          {props.icon && iconPosition === "right" && <Image source={props.icon} resizeMode="contain" className={props.iconStyles} />}
        </>
      )}


    </TouchableOpacity>
  )
}

export default CustomButton