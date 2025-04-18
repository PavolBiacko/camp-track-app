import CustomButton from '@/components/custom/CustomButton'
import { FinanceAccountProps } from '@/types/finance'
import { View } from 'react-native'

const FinanceAccountFooter = ({ type }: FinanceAccountProps) => {
  return (
    <View className="border-t border-outline-300 justify-center items-center py-4">
      <CustomButton
        title={(type === "increment") ? "Pridanie peňazí" : "Vrátenie peňazí"}
        action="primary"
        handlePress={() => { }}
        textStyles="text-2xl text-center"
        containerStyles="h-16 rounded-3xl px-5"
      />
    </View>
  )
}

export default FinanceAccountFooter