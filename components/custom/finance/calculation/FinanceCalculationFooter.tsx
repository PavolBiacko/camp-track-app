import CustomButton from '@/components/custom/CustomButton';
import FinanceCalculationModal from '@/components/custom/finance/calculation/base/FinanceCalculationModal';
import { useAuth } from '@/hooks/useAuth';
import { FinanceCalculationFooterProps } from '@/types/finance';
import { useState } from 'react';
import { View } from 'react-native';

const FinanceCalculationFooter = (props: FinanceCalculationFooterProps) => {
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  if (!user) {
    return null;  // should not happen, since useAuth is used in the layout layer
  }

  return (
    <>
      <View className="h-[13%] items-center">
        <View className="w-full h-1/6 bg-background-300 border-y-2 border-outline-500" />
        <View className="w-full h-5/6 justify-center items-center">
          <CustomButton
            title="Výber akcie"
            action="primary"
            handlePress={() => setModalVisible(true)}
            textStyles="text-2xl text-center"
            containerStyles="w-2/3 h-16 rounded-3xl px-5"
          />
        </View>
      </View>
      <FinanceCalculationModal
        leaderId={user.id}
        children={props.children}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  )
}

export default FinanceCalculationFooter