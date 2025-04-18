import { useFinanceAccountContext } from '@/components/custom/context/FinanceAccountContext';
import CustomButton from '@/components/custom/CustomButton';
import { FinanceAccountHeaderProps } from '@/types/finance';
import { Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

const FinanceAccountHeader = ({ type }: FinanceAccountHeaderProps) => {
  const { childAccountBalance, actionAmount } = useFinanceAccountContext();

  return (
    <View className="border-y border-outline-300 justify-center items-center pt-3 pb-1 gap-3">
      <CustomButton
        title={`${childAccountBalance.toFixed(2)} €`}
        action="secondary"
        handlePress={() => { }}
        textStyles="text-5xl pt-4"
        containerStyles="px-5 h-20 rounded-3xl"
      />
      <Text className={
        twMerge(
          'text-quaternary-950 text-2xl font-psemibold',
          (type === "increment" ? "text-success-500" : "text-error-500")
        )
      }>
        {(type === "increment") ? "+" : "-"} {actionAmount.toFixed(2)} €
      </Text>
    </View>
  )
}

export default FinanceAccountHeader