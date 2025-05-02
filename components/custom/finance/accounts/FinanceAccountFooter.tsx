import { useFinanceAccountContext } from '@/components/custom/context/FinanceAccountContext';
import CustomButton from '@/components/custom/CustomButton';
import FinanceAccountSummaryModal from '@/components/custom/finance/accounts/base/FinanceAccountSummaryModal';
import { useAuth } from '@/hooks/useAuth';
import { FinanceAccountFooterProps } from '@/types/finance';
import { getActionButtonTitle, isTransactionActionAvailable } from '@/utils/finance';
import { useState } from 'react';
import { View } from 'react-native';

const FinanceAccountFooter = (props: FinanceAccountFooterProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { childAccountBalance, actionAmount, transactionType } = useFinanceAccountContext();
  const { user } = useAuth();

  if (!user) {
    return null;  // should not happen, since useAuth is used in the layout layer
  }

  return (
    <>
      <View className="border-t border-outline-300 justify-center items-center py-4">
        <CustomButton
          title={getActionButtonTitle(transactionType)}
          action="primary"
          handlePress={() => setModalVisible(true)}
          textStyles="text-2xl text-center"
          containerStyles="w-3/4 h-16 rounded-3xl px-5"
          isDisabled={!isTransactionActionAvailable(transactionType, childAccountBalance, actionAmount)}
        />
      </View>
      <FinanceAccountSummaryModal
        childId={props.childId}
        leaderId={user.id}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  )
}

export default FinanceAccountFooter
