import { formatDate } from '@/utils/dates';
import { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomButton from '../../CustomButton';

const ScheduleDatePicker = () => {
  const [date, setDate] = useState(new Date()); // Počiatočný dátum: 21.7.2023
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const openDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    setDatePickerVisible(false);
  };

  const handleCancel = () => {
    setDatePickerVisible(false);
  };

  return (
    <>
      <CustomButton
        title={formatDate(date)}
        action="tertiary"
        variant="combined"
        handlePress={openDatePicker}
        textStyles='text-3xl font-pbold self-center mt-2'
        containerStyles="w-11/12 h-20 rounded-3xl"
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date}
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