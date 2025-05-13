import { CampGroupsLineTextProps } from '@/types/camp'
import React from 'react'
import { Text, View } from 'react-native'

const CampGroupsLineText = ({ firstName, lastName }: CampGroupsLineTextProps) => {
  return (
    <>
      {firstName && lastName
        ? (
          <View className="items-center pt-1">
            <Text className="text-typography-800 font-pbold text-2xl">
              {firstName}
            </Text>
            <Text className="text-typography-800 font-pbold text-2xl">
              {lastName}
            </Text>
          </View>
        )
        : (
          <View className="items-center pt-1">
            <Text className="text-typography-800 font-pbold text-2xl">
              ŽIADNY
            </Text>
            <Text className="text-typography-800 font-pbold text-2xl">
              VEDÚCI
            </Text>
          </View>
        )}
    </>
  )
}

export default CampGroupsLineText