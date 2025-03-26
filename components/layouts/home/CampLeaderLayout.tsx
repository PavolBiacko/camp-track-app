import React from 'react'
import { TouchableOpacity, View } from 'react-native'

const CampLeaderLayout = () => {
  return (
    <>
      <View className="h-1/4 m-5">
        <TouchableOpacity onPress={() => { }} activeOpacity={0.7} className="rounded-3xl justify-center items-center bg-background-300 h-full border-2 border-primary-500">
        </TouchableOpacity>
      </View>
      <View className="h-1/4 m-5">
        <TouchableOpacity onPress={() => { }} activeOpacity={0.7} className="rounded-3xl justify-center items-center bg-background-300 h-full border-2 border-primary-500">
        </TouchableOpacity>
      </View>
      <View className="h-1/4 flex-row justify-between m-5">
        <View className="w-[47%]">
          <TouchableOpacity onPress={() => { }} activeOpacity={0.7} className="rounded-3xl justify-center items-center bg-background-300 h-full border-2 border-primary-500">
          </TouchableOpacity>
        </View>
        <View className="w-[47%]">
          <TouchableOpacity onPress={() => { }} activeOpacity={0.7} className="rounded-3xl justify-center items-center bg-background-300 h-full border-2 border-primary-500">
          </TouchableOpacity>
        </View>
      </View >
    </>
  )
}

export default CampLeaderLayout