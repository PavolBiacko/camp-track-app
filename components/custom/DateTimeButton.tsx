import CustomButton from '@/components/custom/CustomButton'
import { dateformats } from '@/constants'
import { mapDateTimeToString, mapStringToDateTime } from '@/mappers/datetime'
import { DateTimeButtonProps } from '@/types/custom/button'
import { formatISOLocalToHumanReadable } from '@/utils/dates'
import { useState } from 'react'
import { Controller, FieldValues, Path } from 'react-hook-form'
import { Text, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const DateTimeButton = <T extends FieldValues>(props: DateTimeButtonProps<T>) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const openDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleCancel = () => {
    setDatePickerVisible(false);
  };

  return (
    <Controller
      control={props.control}
      name={props.formDataTypeKey as Path<T>}
      render={({ field: { onChange, value } }) => (
        <View className={props.otherStyles}>
          <Text className={`text-typography-950 font-psemibold mb-1 ${props.titleStyles}`}>{props.title}</Text>
          <CustomButton
            title={!props.isDisabled ? (props.mode === "date" ? formatISOLocalToHumanReadable(value) : value) : dateformats.DISABLED_DATE}
            action={props.action}
            variant={props.variant}
            handlePress={openDatePicker}
            textStyles={`self-center ${props.textStyles}`}
            containerStyles="w-full h-20 rounded-3xl"
            isDisabled={props.isDisabled}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={props.mode}
            date={mapStringToDateTime(value, props.mode)}
            onConfirm={
              (selectedDate) => {
                onChange(mapDateTimeToString(selectedDate, props.mode));
                setDatePickerVisible(false);
                props.handleSubmit && props.handleSubmit();
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