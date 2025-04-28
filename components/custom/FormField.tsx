import { getRGBColor } from "@/components/ui/gluestack-ui-provider/colors"
import { icons } from "@/constants"
import { FormFieldProps } from '@/types/custom/field'
import { getKeyboardType } from "@/utils/ui"
import { useColorScheme } from "nativewind"
import { useState } from 'react'
import { Controller, FieldValues, Path } from "react-hook-form"
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { twMerge } from "tailwind-merge"

const FormField = <T extends FieldValues,>(props: FormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false);
  const { colorScheme } = useColorScheme();

  return (
    <View className={`${props.otherStyles}`}>
      {props.title &&
        <Text className="text-typography-950 text-base font-psemibold pb-1">
          {props.title}
        </Text>
      }
      <View className={
        twMerge(
          `flex-row bg-background-200 border-2 items-center rounded-2xl`,
          `${isFocused ? "border-primary-500" : "border-outline-400"}`,
          `w-full ${props.isMultine ? "h-32 py-1" : "h-16"}`
        )}>
        <Controller
          control={props.control}
          name={props.formDataTypeKey as Path<T>}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className={
                twMerge(
                  "flex-1 text-typography-950 font-psemibold",
                  "w-16 h-full px-6 text-xl"
                )}
              value={value}
              onChangeText={onChange}
              onFocus={() => setIsFocused(true)}
              onEndEditing={() => setIsFocused(false)}
              multiline={props.isMultine}
              textAlignVertical={props.isMultine ? "top" : "center"}
              placeholder={props.placeholder}
              placeholderTextColor={getRGBColor("typography", "500", colorScheme)}
              {...props.register(props.formDataTypeKey as Path<T>)}
              secureTextEntry={String(props.formDataTypeKey).includes("password") && !showPassword}
              keyboardType={getKeyboardType(props.formDataTypeKey as string)}
              maxLength={props.maxLength}
            />
          )}
        />

        {String(props.formDataTypeKey).includes("password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6 mr-4" resizeMode="contain" />
          </TouchableOpacity>
        )}

        {String(props.formDataTypeKey).includes("Amount") && (
          <Text className="text-typography-950 text-2xl font-bold mr-4">€</Text>
        )}
      </View>
      {props.error && (
        <Text className="text-error-500 text-center font-plight mt-1">
          {props.error?.message as string}
        </Text>)}
    </View>
  )
}

export default FormField