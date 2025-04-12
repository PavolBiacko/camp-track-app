import CustomButton from '@/components/custom/CustomButton'
import { View } from 'react-native'

const FinanceOverviewHeader = () => {
  return (
    <View className="border-b border-outline-300 justify-center items-center pb-5 gap-3">
      <CustomButton
        title="650.50€"
        action="secondary"
        handlePress={() => { }}
        textStyles="text-5xl pt-4"
        containerStyles="px-5 h-20 rounded-3xl"
      />
    </View>
  )
}

export default FinanceOverviewHeader