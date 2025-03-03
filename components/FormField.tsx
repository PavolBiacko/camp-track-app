import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { icons } from "@/constants"
import { FormFieldProps } from '@/types/types'

const FormField = <T,>({ title, value, formDataTypeKey, placeholder, handleChangeText, otherStyles }: FormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`${otherStyles}`}>
      <Text className="text-base text-gray font-pmedium mb-1">{title}</Text>
      <View className={`flex-row border-2 items-center w-full h-16 px-4 rounded-2xl
                        ${isFocused ? "border-secondary" : "border-black-200"} bg-black-100`}>
        <TextInput
          className="flex-1 text-white font-psemibold text-base w-16 h-full"
          value={value as string}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={String(formDataTypeKey).includes("password") && !showPassword}
          keyboardType={String(formDataTypeKey).includes("email") ? "email-address" : "default"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {String(formDataTypeKey).includes("password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField