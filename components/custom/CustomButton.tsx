import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors'
import { CustomButtonProps } from '@/types/custom/button'
import { getButtonStyles } from '@/utils/ui'
import { useColorScheme } from 'nativewind'
import { FC } from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'

const CustomButton: FC<CustomButtonProps> = ({ iconPosition = "left", ...props }) => {
  const { colorScheme } = useColorScheme();

  const hasBoth = !!props.title && !!props.icon;
  const buttonStyles = getButtonStyles(props.action, props.variant);

  return (
    <TouchableOpacity
      onPress={props.handlePress}
      activeOpacity={0.5}
      className={
        twMerge(
          buttonStyles,
          props.isLoading || props.isDisabled ? "opacity-30" : "",
          props.containerStyles,
          "justify-center items-center",
          hasBoth ? "flex-row gap-3" : ""
        )
      }
      disabled={props.isLoading || props.isDisabled}
    >
      {props.isLoading ? (
        <ActivityIndicator size="large" color={getRGBColor('typography', '950', colorScheme)} />
      ) : (
        <>
          {props.icon && iconPosition === "left" && <Image source={props.icon} resizeMode="contain" className={props.iconStyles} style={{ tintColor: props.iconTintColor }} />}
          {props.title && <Text className={twMerge("text-typography-800 text-lg font-psemibold text-center mt-1", props.textStyles)}>{props.title}</Text>}
          {props.icon && iconPosition === "right" && <Image source={props.icon} resizeMode="contain" className={props.iconStyles} style={{ tintColor: props.iconTintColor }} />}
        </>
      )}


    </TouchableOpacity>
  )
}

export default CustomButton