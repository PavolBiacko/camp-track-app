import React, { FC, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { icons } from "@/constants"
import { FormFieldProps } from '@/types/types'

const FormField: FC<FormFieldProps> = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className={`flex-row border-2 items-center w-full h-16 px-4 rounded-2xl
                        ${isFocused ? "border-secondary" : "border-black-200"} bg-black-100`}>
        <TextInput
          className="flex-1 text-white font-psemibold text-base w-11 h-full"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Heslo" && !showPassword}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {title === "Heslo" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField