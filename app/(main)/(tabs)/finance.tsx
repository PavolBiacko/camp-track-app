import CustomButton from '@/components/custom/CustomButton'
import { useAuth } from '@/hooks/useAuth'
import { router } from 'expo-router'
import { useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Finance = () => {
  const textStyles = "text-center text-2xl font-pbold"

  const [loadingCalculation, setLoadingCalculation] = useState(false);

  const { user } = useAuth();

  if (!user) {
    return null;  // should not happen, since useAuth is used in the layout layer
  }

  const handleCalculationNavigate = async () => {
    setLoadingCalculation(true);
    await new Promise((resolve) => setTimeout(resolve, 100));  // forcing loading for calculation
    router.push('/(main)/(finance)/calculation');
    setLoadingCalculation(false);
  }

  return (
    <SafeAreaView className='justify-center h-full'>
      <View className="h-1/4 flex-row justify-between mx-5 my-2">
        <CustomButton
          title='Celkový prehľad'
          action='background'
          handlePress={() => router.push("/(main)/(finance)/overview")}
          containerStyles="rounded-3xl w-[48%]"
          textStyles={textStyles}
        />
        <CustomButton
          title='Nastavenia účtov detí'
          action='background'
          handlePress={() => router.push({ pathname: '/(main)/(finance)/accounts', params: { leaderId: user.id } })}
          containerStyles="rounded-3xl w-[48%]"
          textStyles={textStyles}
        />
      </View>
      <View className="h-[12.5%] mx-5 my-2">
        <CustomButton
          title='Výpis pohybov'
          action='background'
          handlePress={() => router.push('/(main)/(finance)/transactions')}
          containerStyles="rounded-3xl h-full"
          textStyles={textStyles}
        />
      </View>
      <View className="h-[12.5%] mx-5 my-2">
        <CustomButton
          title='Výpočet výdavkov'
          action='secondary'
          handlePress={handleCalculationNavigate}
          containerStyles="rounded-3xl h-full"
          textStyles={textStyles}
          isLoading={loadingCalculation}
        />
      </View>
      <View className="h-1/3 mx-5 my-2">
        <CustomButton
          title='Návšteva bufetu'
          action='tertiary'
          handlePress={() => router.push({ pathname: '/(main)/(finance)/buffet', params: { leaderId: user.id } })}
          containerStyles="rounded-3xl h-full"
          textStyles={textStyles}
        />
      </View>
    </SafeAreaView>
  )
}

export default Finance