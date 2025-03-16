import { colors, icons } from "@/constants"
import { FormFieldProps } from '@/types/field'
import { useState } from 'react'
import { Controller, FieldValues, Path } from "react-hook-form"
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

const FormField = <T extends FieldValues,>(props: FormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`${props.otherStyles}`}>
      <Text className="text-base text-lightMid font-pmedium mb-1">{props.title}</Text>
      <View className={`flex-row border-2 items-center w-full h-16 px-4 rounded-2xl
                      ${isFocused ? "border-primary" : "border-darkLow"} bg-darkMid`}>
        <Controller
          control={props.control}
          name={props.formDataTypeKey as Path<T>}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className={`flex-1 text-white font-psemibold text-base w-16 h-full`}
              value={value}
              onChangeText={onChange}
              onFocus={() => setIsFocused(true)}
              onEndEditing={() => setIsFocused(false)}
              placeholder={props.placeholder}
              placeholderTextColor={colors.gray}
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
        <Text className="text-error mt-1">
          {props.error?.message as string}
        </Text>)}
    </View>
  )
}

export default FormField