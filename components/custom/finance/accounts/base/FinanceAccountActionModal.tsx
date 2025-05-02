import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext';
import CustomButton from '@/components/custom/CustomButton';
import CustomModal from '@/components/custom/CustomModal';
import { useChildrenByLeader } from '@/hooks/models/useChildren';
import { useAuth } from '@/hooks/useAuth';
import { AccountActionType, FinanceAccountActionModalProps } from '@/types/finance';
import { getTotalOfChildrenBalances, isAccountActionAvailable } from '@/utils/finance';
import { router } from 'expo-router';

const FinanceAccountActionModal = ({ childId, modalVisible, setModalVisible }: FinanceAccountActionModalProps) => {
  const { user } = useAuth();
  const leaderId = user?.id!;

  const { totalAmount } = useFinanceOverviewContext();
  const { children, isLoading } = useChildrenByLeader(leaderId);

  const handleOptionSelect = (type: AccountActionType) => {
    setModalVisible(false);
    router.push({ pathname: "/(main)/(finance)/accounts/money-form", params: { childId, leaderId, type } });
  };

  return (
    <CustomModal
      title="Výber akcie"
      type="custom"
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      containerStyles='w-5/6'>
      <CustomButton
        title={(childId) ? "Pridanie peňazí" : "Výdavok vyplatenia"}
        action="success"
        variant="solid"
        handlePress={() => handleOptionSelect('increment')}
        containerStyles="rounded-xl py-3 mb-3"
        textStyles="text-2xl"
        isLoading={isLoading}
        isDisabled={!!children && !isAccountActionAvailable('increment', childId, totalAmount, getTotalOfChildrenBalances(children))}
      />
      <CustomButton
        title={(childId) ? "Vrátenie peňazí" : "Vyplatenie bufetu"}
        action="error"
        variant="solid"
        handlePress={() => handleOptionSelect('decrement')}
        containerStyles="rounded-xl py-3 mb-3"
        textStyles="text-2xl"
        isLoading={isLoading}
        isDisabled={!!children && !isAccountActionAvailable('decrement', childId, totalAmount, getTotalOfChildrenBalances(children))}
      />
    </CustomModal>
  )
}

export default FinanceAccountActionModal