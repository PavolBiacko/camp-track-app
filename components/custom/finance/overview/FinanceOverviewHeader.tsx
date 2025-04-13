import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext';
import CustomButton from '@/components/custom/CustomButton';
import { View } from 'react-native';

const FinanceOverviewHeader = () => {
  const { totalAmount } = useFinanceOverviewContext();

  return (
    <View className="border-y border-outline-300 justify-center items-center py-3 gap-3">
      <CustomButton
        title={`${totalAmount.toFixed(2)} €`}
        action="secondary"
        handlePress={() => { }}
        textStyles="text-5xl pt-4"
        containerStyles="px-5 h-20 rounded-3xl"
      />
    </View>
  )
}

export default FinanceOverviewHeader