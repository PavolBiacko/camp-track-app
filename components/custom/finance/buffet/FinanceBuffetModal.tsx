import CustomModal from '@/components/custom/CustomModal';
import FinanceBuffetSummary from '@/components/custom/finance/buffet/FinanceBuffetSummary';
import { FinanceBuffetModalProps } from '@/types/finance';
import { formatISOLocalToHumanReadable } from '@/utils/dates';

const FinanceBuffetModal = ({ children, actionAmounts, modalVisible, setModalVisible }: FinanceBuffetModalProps) => {

  const handleConfirm = () => {

  };

  return (
    <CustomModal
      title={`Súhrn za ${formatISOLocalToHumanReadable(new Date())}`}
      type="confirmation"
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      handleConfirm={handleConfirm}
      containerStyles='w-11/12 h-[90%]'>
      <FinanceBuffetSummary children={children} actionAmounts={actionAmounts} />
    </CustomModal>
  )
}

export default FinanceBuffetModal