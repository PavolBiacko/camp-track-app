import CustomButton from '@/components/custom/CustomButton'
import { View } from 'react-native'

const FinanceOverviewFooter = () => {
  return (
    <View className="border-t border-outline-300 justify-center items-center py-4">
      <CustomButton
        title="Vyplatenie bufetu"
        action="primary"
        handlePress={() => { }}
        textStyles="text-2xl text-center"
        containerStyles="h-16 rounded-3xl px-5"
      />
    </View>
  )
}

export default FinanceOverviewFooter