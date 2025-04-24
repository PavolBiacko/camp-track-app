import { useFinanceAccountContext } from '@/components/custom/context/FinanceAccountContext';
import CustomButton from '@/components/custom/CustomButton';
import FinanceAccountSummaryModal from '@/components/custom/finance/accounts/base/FinanceAccountSummaryModal';
import { FinanceAccountFooterProps } from '@/types/finance';
import { useState } from 'react';
import { View } from 'react-native';

const FinanceAccountFooter = (props: FinanceAccountFooterProps) => {
  const { actionAmount } = useFinanceAccountContext();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View className="border-t border-outline-300 justify-center items-center py-4">
        <CustomButton
          title={(props.type === "increment") ? "Pridanie peňazí" : "Vrátenie peňazí"}
          action="primary"
          handlePress={() => setModalVisible(true)}  // Confirmation modal
          textStyles="text-2xl text-center"
          containerStyles="w-2/3 h-16 rounded-3xl px-5"
          isDisabled={actionAmount === 0}
        />

      </View>
      <FinanceAccountSummaryModal
        type={props.type}
        childId={props.childId}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  )
}

export default FinanceAccountFooter
