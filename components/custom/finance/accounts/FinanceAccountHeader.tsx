import CustomButton from '@/components/custom/CustomButton';
import { FinanceAccountProps } from '@/types/finance';
import { Text, View } from 'react-native';

const FinanceAccountHeader = ({ type }: FinanceAccountProps) => {
  const totalAmount = 0; // Replace with actual logic to get the total amount

  return (
    <View className="border-y border-outline-300 justify-center items-center pt-3 pb-1 gap-3">
      <CustomButton
        title={`${totalAmount.toFixed(2)} €`}
        action="secondary"
        handlePress={() => { }}
        textStyles="text-5xl pt-4"
        containerStyles="px-5 h-20 rounded-3xl"
      />
      <Text className='text-quaternary-950 text-2xl font-psemibold'>{(type === 'increment') ? "+" : "-"} 0.00 €</Text>
    </View>
  )
}

export default FinanceAccountHeader