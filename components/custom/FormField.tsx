import { getRGBColor } from "@/components/ui/gluestack-ui-provider/colors"
import { icons } from "@/constants"
import { FormFieldProps } from '@/types/custom/field'
import { useColorScheme } from "nativewind"
import { useState } from 'react'
import { Controller, FieldValues, Path } from "react-hook-form"
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

const FormField = <T extends FieldValues,>(props: FormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false);
  const { colorScheme } = useColorScheme();

  return (
    <View className={`${props.otherStyles}`}>
      <Text className="text-typography-950 text-base font-pmedium mb-1">{props.title}</Text>
      <View className={`flex-row border-2 items-center w-full h-16 px-4 rounded-2xl
                      ${isFocused ? "border-primary-500" : "border-outline-400"} bg-background-200`}>
        <Controller
          control={props.control}
          name={props.formDataTypeKey as Path<T>}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="flex-1 text-typography-950 font-psemibold w-16 h-full"
              value={value}
              onChangeText={onChange}
              onFocus={() => setIsFocused(true)}
              onEndEditing={() => setIsFocused(false)}
              placeholder={props.placeholder}
              placeholderTextColor={getRGBColor("typography", "500", colorScheme)}
              {...props.register(props.formDataTypeKey as Path<T>)}
              secureTextEntry={String(props.formDataTypeKey).includes("password") && !showPassword}
              keyboardType={String(props.formDataTypeKey).includes("email") ? "email-address" : "default"}
            />
          )}
        />

        {String(props.formDataTypeKey).includes("password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
      {props.error && (
        <Text className="text-error-500 mt-1">
          {props.error?.message as string}
        </Text>)}
    </View>
  )
}

export default FormField