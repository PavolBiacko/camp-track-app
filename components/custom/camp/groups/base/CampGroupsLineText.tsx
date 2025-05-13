import { CampGroupsLineTextProps } from '@/types/camp'
import React from 'react'
import { Text } from 'react-native'

const CampGroupsLineText = ({ firstName, lastName }: CampGroupsLineTextProps) => {
  return (
    <>
      {firstName && lastName
        ? (
          <>
            <Text className="text-typography-800 font-pbold text-2xl">
              {firstName}
            </Text>
            <Text className="text-typography-800 font-pbold text-2xl">
              {lastName}
            </Text>
          </>
        )
        : (
          <Text className="text-typography-800 font-pbold text-2xl pt-1">
            Žiadny vedúci
          </Text>
        )}
    </>
  )
}

export default CampGroupsLineText