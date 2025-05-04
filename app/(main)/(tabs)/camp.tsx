import CustomButton from '@/components/custom/CustomButton'
import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors'
import { icons } from '@/constants'
import { router } from 'expo-router'
import { useColorScheme } from 'nativewind'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Camp = () => {
  const { colorScheme } = useColorScheme();

  const textStyles = "text-center text-4xl font-pbold pt-3"

  return (
    <SafeAreaView className='justify-center h-full'>
      <View className="h-1/4 m-5">
        <CustomButton
          title='Turnusy'
          icon={icons.session}
          iconPosition='right'
          action='background'
          handlePress={() => router.push('/(main)/(camp)/sessions')}
          containerStyles="rounded-3xl h-full border-primary-500"
          iconStyles='w-12 h-12'
          textStyles={textStyles}
          iconTintColor={getRGBColor('typography', '950', colorScheme)}
        />
      </View>
      <View className="h-1/4 m-5">
        <CustomButton
          title='Deti'
          icon={icons.children}
          iconPosition='right'
          action='background'
          handlePress={() => router.push('/(main)/(camp)/children')}
          containerStyles="rounded-3xl h-full border-primary-500"
          textStyles={textStyles}
          iconStyles='w-12 h-12'
          iconTintColor={getRGBColor('typography', '950', colorScheme)}
        />
      </View>
      <View className="h-1/4 m-5">
        <CustomButton
          title='Oddiely'
          icon={icons.group}
          iconPosition='right'
          action='background'
          handlePress={() => router.push('/(main)/(camp)/groups')}
          containerStyles="rounded-3xl h-full border-primary-500"
          textStyles={textStyles}
          iconStyles='w-12 h-12'
          iconTintColor={getRGBColor('typography', '950', colorScheme)}
        />
      </View>
    </SafeAreaView>
  )
}

export default Camp