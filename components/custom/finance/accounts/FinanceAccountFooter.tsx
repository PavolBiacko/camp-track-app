import { useFinanceAccountContext } from '@/components/custom/context/FinanceAccountContext';
import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext';
import CustomButton from '@/components/custom/CustomButton';
import FinanceAccountSummaryModal from '@/components/custom/finance/accounts/base/FinanceAccountSummaryModal';
import { useUpdateAccountBalance, useUpdateCashRegisterByChild } from '@/hooks/models/useFinance';
import { FinanceAccountFooterProps } from '@/types/finance';
import { useState } from 'react';
import { Alert, View } from 'react-native';

const FinanceAccountFooter = (props: FinanceAccountFooterProps) => {
  const { quantities } = useFinanceOverviewContext();
  const { childAccountBalance, actionAmount, counts, resetDenominations } = useFinanceAccountContext();

  const { updateAccountBalance } = useUpdateAccountBalance(props.childId);
  const { updateCashRegister } = useUpdateCashRegisterByChild(props.childId);

  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = async () => {
    try {
      setModalVisible(true);
      // const newBalance = (props.type === "increment") ? childAccountBalance + actionAmount : childAccountBalance - actionAmount;
      // await updateAccountBalance(newBalance);
      // const updatedCounts = processCountsWithQuantities(props.type, quantities, counts);
      // await updateCashRegister(updatedCounts);
      // router.back();
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    } finally {
      resetDenominations(); // Reset denominations after updating
      // setModalVisible(false);
    }
  };

  return (
    <>
      <View className="border-t border-outline-300 justify-center items-center py-4">
        <CustomButton
          title={(props.type === "increment") ? "Pridanie peňazí" : "Vrátenie peňazí"}
          action="primary"
          handlePress={handleConfirm}
          textStyles="text-2xl text-center"
          containerStyles="w-2/3 h-16 rounded-3xl px-5"
          isLoading={isLoading}
        />

      </View>
      <FinanceAccountSummaryModal
        childId={props.childId}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  )
}

export default FinanceAccountFooter
