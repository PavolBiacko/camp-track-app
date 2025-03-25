import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors'
import { CustomButtonProps } from '@/types/button'
import { useColorScheme } from 'nativewind'
import { FC } from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'

const CustomButton: FC<CustomButtonProps> = ({ iconPosition = "left", ...props }) => {
  const { colorScheme } = useColorScheme();
  const hasBoth = !!props.title && !!props.icon;

  return (
    <TouchableOpacity
      onPress={props.handlePress}
      activeOpacity={0.7}
      className={
        twMerge(
          props.isPrimary ? "bg-primary-500" : "bg-background-500",
          props.isLoading ? "opacity-50" : "",
          props.containerStyles,
          "rounded-3xl justify-center items-center",
          hasBoth ? "flex-row gap-3" : ""
        )
      }
      disabled={props.isLoading}
    >
      {props.isLoading ? (
        <ActivityIndicator size="large" color={getRGBColor('typography', '950', colorScheme)} />
      ) : (
        <>
          {props.icon && iconPosition === "left" && <Image source={props.icon} resizeMode="contain" className={props.iconStyles} />}
          {props.title && <Text className={twMerge("text-typography-black text-lg font-psemibold", props.textStyles)}>{props.title}</Text>}
          {props.icon && iconPosition === "right" && <Image source={props.icon} resizeMode="contain" className={props.iconStyles} />}
        </>
      )}


    </TouchableOpacity>
  )
}

export default CustomButton