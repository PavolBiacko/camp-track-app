import { useFinanceAccountContext } from '@/components/custom/context/FinanceAccountContext';
import CustomButton from '@/components/custom/CustomButton';
import { useUpdateAccountBalance } from '@/hooks/models/useFinance';
import { FinanceAccountFooterProps } from '@/types/finance';
import { router } from 'expo-router';
import { Alert, View } from 'react-native';

const FinanceAccountFooter = (props: FinanceAccountFooterProps) => {
  const { childAccountBalance, actionAmount, counts, resetDenominations } = useFinanceAccountContext();
  const { updateAccountBalance } = useUpdateAccountBalance(props.childId);

  const handleConfirm = async () => {
    try {
      const newBalance = (props.type === "increment") ? childAccountBalance + actionAmount : childAccountBalance - actionAmount;
      await updateAccountBalance(newBalance);
      router.back();
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    } finally {
      resetDenominations(); // Reset denominations after updating
    }
  };

  return (
    <View className="border-t border-outline-300 justify-center items-center py-4">
      <CustomButton
        title={(props.type === "increment") ? "Pridanie peňazí" : "Vrátenie peňazí"}
        action="primary"
        handlePress={handleConfirm}
        textStyles="text-2xl text-center"
        containerStyles="h-16 rounded-3xl px-5"
      />
    </View>
  )
}

export default FinanceAccountFooter
