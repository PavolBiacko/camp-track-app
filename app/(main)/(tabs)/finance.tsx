import CustomButton from '@/components/custom/CustomButton'
import { router } from 'expo-router'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Finance = () => {
  const containerStyles = "rounded-3xl w-[47%]"
  const textStyles = "text-center text-2xl font-pbold"

  return (
    <SafeAreaView className='justify-center h-full'>
      <View className="h-1/4 flex-row justify-between m-5">
        <CustomButton
          title='Celkový prehľad'
          action='background'
          handlePress={() => router.push('/(main)/(finance)/overview')}
          containerStyles={containerStyles}
          textStyles={textStyles}
        />
        <CustomButton
          title='Výpis pohybov'
          action='background'
          handlePress={() => router.push('/(main)/(finance)/transactions')}
          containerStyles={containerStyles}
          textStyles={textStyles}
        />
      </View>
      <View className="h-1/4 flex-row justify-between m-5">
        <CustomButton
          title='Nastavenia účtov detí'
          action='background'
          handlePress={() => router.push('/(main)/(finance)/accounts')}
          containerStyles={containerStyles}
          textStyles={textStyles}
        />
        <CustomButton
          title='Výpočet výdavkov'
          action='background'
          handlePress={() => router.push('/(main)/(finance)/calculation')}
          containerStyles={containerStyles}
          textStyles={textStyles}
        />
      </View>
      <View className="h-1/4 m-5">
        <CustomButton
          title='Návšteva bufetu'
          action='tertiary'
          handlePress={() => router.push('/(main)/(finance)/buffet')}
          containerStyles="rounded-3xl h-full"
          textStyles={textStyles}
        />
      </View>
    </SafeAreaView>
  )
}

export default Finance