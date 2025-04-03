import { useScheduleContext } from '@/components/custom/context/ScheduleContext';
import CustomButton from '@/components/custom/CustomButton';
import { formatDate } from '@/utils/dates';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ScheduleDatePicker = () => {
  const queryClient = useQueryClient();

  const { selectedDate, setSelectedDate } = useScheduleContext();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const openDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleConfirm = (selectedDate: Date) => {
    setSelectedDate(selectedDate);
    setDatePickerVisible(false);
    queryClient.invalidateQueries({ queryKey: ['activities'] });
  };

  const handleCancel = () => {
    setDatePickerVisible(false);
  };

  return (
    <>
      <CustomButton
        title={formatDate(selectedDate)}
        action="tertiary"
        variant="combined"
        handlePress={openDatePicker}
        textStyles='text-3xl font-pbold self-center mt-2'
        containerStyles="w-11/12 h-20 rounded-3xl"
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={selectedDate}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        locale="sk-SK"
        confirmTextIOS="Potvrdiť"
        cancelTextIOS="Zrušiť"
      />
    </>
  )
}

export default ScheduleDatePicker