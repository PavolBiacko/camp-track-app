import CustomButton from '@/components/custom/CustomButton'
import { mapDateToString, mapTimeToString } from '@/mappers/datetime'
import { DateTimeButtonProps } from '@/types/custom/button'
import { useState } from 'react'
import { Controller, FieldValues, Path } from 'react-hook-form'
import { Text, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const DateTimeButton = <T extends FieldValues>(props: DateTimeButtonProps<T>) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const disabledFormat = props.mode === "date" ? "--.--.----" : "--:--";

  const openDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleCancel = () => {
    setDatePickerVisible(false);
  };

  // Parse string to Date for picker
  const parseStringToDate = (value: string): Date => {
    if (!value) return new Date();
    if (props.mode === "time") {
      const [hours, minutes] = value.split(":");
      const date = new Date();
      date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
      return date;
    }
    const [day, month, year] = value.split(".");
    return new Date(`${year}-${month}-${day}`);
  };

  return (
    <Controller
      control={props.control}
      name={props.formDataTypeKey as Path<T>}
      render={({ field: { onChange, value } }) => (
        <View className={`${props.otherStyles}`}>
          <Text className="text-typography-950 self-start text-base font-pmedium mb-1">{props.title}</Text>
          <CustomButton
            title={!props.isDisabled ? value : disabledFormat}
            action={props.action}
            variant={props.variant}
            handlePress={openDatePicker}
            textStyles='text-3xl font-pbold self-center mt-2'
            containerStyles="w-full h-20 rounded-3xl"
            isDisabled={props.isDisabled}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={props.mode}
            date={parseStringToDate(value)}
            onConfirm={
              (selectedDate) => {
                onChange(props.mode === "time" ? mapTimeToString(selectedDate) : mapDateToString(selectedDate));
                setDatePickerVisible(false);
                console.log(selectedDate);
              }
            }
            onCancel={handleCancel}
            locale="sk-SK"
            confirmTextIOS="Potvrdiť"
            cancelTextIOS="Zrušiť"
          />
        </View>
      )}
    />
  )
}

export default DateTimeButton