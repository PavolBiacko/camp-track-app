import { useScheduleContext } from '@/components/custom/context/ScheduleContext'
import CustomButton from '@/components/custom/CustomButton'
import CustomModal from '@/components/custom/CustomModal'
import CustomSwitch from '@/components/custom/CustomSwitch'
import DateTimeButton from '@/components/custom/DateTimeButton'
import FormField from '@/components/custom/FormField'
import { FormProps } from '@/types/custom/form'
import { ActivityCreate, ActivityUpdate } from '@/types/models/activities'
import { formatDateToISOLocal } from '@/utils/dates'
import { getScheduleFormFields } from '@/utils/schedule'
import { capitalizeWord } from '@/utils/strings'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FieldError, FieldErrors, Path, PathValue, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'

const ScheduleForm = <T extends ActivityCreate | ActivityUpdate>(props: FormProps<T>) => {

  const { control, handleSubmit, register, setValue, formState: { errors } } = useForm<T>({
    defaultValues: props.initialValues,
    resolver: zodResolver(props.validationSchema)
  })

  const { selectedDate } = useScheduleContext();
  const [isPeriodic, setIsPeriodic] = useState<boolean>(props.initialValues.date === null);
  const { nameField, descriptionField, timeField, dateField } = getScheduleFormFields<T>(props.fields);

  const [modalVisible, setModalVisible] = useState(false);

  // Handle switch toggle and update the date field accordingly
  const handleSwitchChange = (newValue: boolean) => {
    setIsPeriodic(newValue);
    const dateValue = (newValue) ? null : formatDateToISOLocal(selectedDate);
    setValue(dateField.formDataTypeKey as Path<T>, dateValue as PathValue<T, Path<T>>, { shouldValidate: true });
  };

  return (
    <View className="w-full justify-center">
      <Text className="text-typography-950 text-2xl mt-5 font-pbold">
        {props.title}
      </Text>

      {/* name of the activity */}
      <FormField
        title={capitalizeWord(nameField.title)!}
        control={control}
        register={register}
        error={errors[nameField.formDataTypeKey as keyof FieldErrors<T>] as FieldError | undefined}
        formDataTypeKey={nameField.formDataTypeKey}
        placeholder={nameField.placeholder}
        otherStyles={nameField.otherStyles || "mt-5"}
      />

      {/* description of the activity */}
      <FormField
        title={capitalizeWord(descriptionField.title)!}
        control={control}
        register={register}
        isMultineFixed={true}
        error={errors[descriptionField.formDataTypeKey as keyof FieldErrors<T>] as FieldError | undefined}
        formDataTypeKey={descriptionField.formDataTypeKey}
        placeholder={descriptionField.placeholder}
        otherStyles={descriptionField.otherStyles || "mt-5"}
      />

      <View className="w-full flex-row mt-5">
        <DateTimeButton
          title={timeField.title}
          formDataTypeKey={timeField.formDataTypeKey}
          control={control}
          mode="time"
          isSpinner={true}
          action='secondary'
          textStyles='text-3xl font-pbold mt-2'
          otherStyles='w-2/5 items-start'
        />
        <DateTimeButton
          title={dateField.title}
          formDataTypeKey={dateField.formDataTypeKey}
          control={control}
          mode="date"
          action='tertiary'
          titleStyles='self-start'
          textStyles='text-3xl font-pbold mt-2'
          otherStyles='w-3/5 pl-5 items-end'
          isDisabled={isPeriodic}
        />
      </View>

      <CustomSwitch
        onFalseText='Jednorázová'
        onTrueText='Periodická'
        value={isPeriodic}
        onValueChange={handleSwitchChange}
      />

      {/* submit the activity */}
      <CustomButton
        title={props.buttonText || props.title}
        handlePress={() => setModalVisible(true)}
        textStyles='text-2xl'
        containerStyles="mt-5 h-[4.5rem] rounded-3xl"
      />
      <CustomModal
        title="Naozaj chceš vykonať akciu?"
        type="confirmation"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleConfirm={handleSubmit(props.onSubmit)}
        containerStyles='w-3/4'
      />
    </View>
  )
}

export default ScheduleForm
