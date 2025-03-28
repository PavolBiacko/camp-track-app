import { SettingsBoxProps } from '@/types/base';
import { PropsWithChildren } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const SettingsBox = (props: PropsWithChildren<SettingsBoxProps>) => {
  const contentWrapperStyles = `border border-secondary-300 rounded-xl ${props.containerStyles}`;

  return (
    <View className="mx-7 my-4">
      <Text className={`text-typography-950 text-lg font-psemibold mb-2`}>{props.title}</Text>
      {props.isClickable ? (
        <TouchableOpacity
          className={contentWrapperStyles}
          onPress={props.handlePress}
          activeOpacity={0.7}
        >
          {props.children}
        </TouchableOpacity>
      ) : (
        <View className={contentWrapperStyles}>
          {props.children}
        </View>
      )}
    </View>
  )
}

export default SettingsBox