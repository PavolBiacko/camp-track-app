import CustomButton from '@/components/custom/CustomButton'
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
import { ScrollView, Text, View } from 'react-native'
import { useScheduleContext } from '../context/ScheduleContext'

const ScheduleForm = <T extends ActivityCreate | ActivityUpdate>(props: FormProps<T>) => {

  const { control, handleSubmit, register, setValue, formState: { isSubmitting, errors } } = useForm<T>({
    defaultValues: props.initialValues,
    resolver: zodResolver(props.validationSchema)
  })

  const { selectedDate } = useScheduleContext();
  const [isPeriodic, setIsPeriodic] = useState<boolean>(props.initialValues.date === null);
  const { nameField, descriptionField, timeField, dateField } = getScheduleFormFields<T>(props.fields);

  // Handle switch toggle and update the date field accordingly
  const handleSwitchChange = (newValue: boolean) => {
    setIsPeriodic(newValue);
    const dateValue = (newValue) ? null : formatDateToISOLocal(selectedDate);
    setValue(dateField.formDataTypeKey as Path<T>, dateValue as PathValue<T, Path<T>>, { shouldValidate: true });
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View className="w-full justify-center px-4 my-6">
        <Text className="text-typography-950 text-2xl mt-5 font-pbold">{props.title}</Text>

        {/* name of the activity */}
        <FormField
          title={capitalizeWord(nameField.title)!}
          control={control}
          register={register}
          error={errors[nameField.formDataTypeKey as keyof FieldErrors<T>] as FieldError | undefined}
          formDataTypeKey={nameField.formDataTypeKey}
          placeholder={nameField.placeholder}
          otherStyles={nameField.otherStyles || "mt-7"}
        />

        {/* description of the activity */}
        <FormField
          title={capitalizeWord(descriptionField.title)!}
          control={control}
          register={register}
          error={errors[descriptionField.formDataTypeKey as keyof FieldErrors<T>] as FieldError | undefined}
          formDataTypeKey={descriptionField.formDataTypeKey}
          placeholder={descriptionField.placeholder}
          otherStyles={descriptionField.otherStyles || "mt-7"}
        />

        <View className="w-full flex-row mt-7">
          <DateTimeButton
            title={timeField.title}
            formDataTypeKey={timeField.formDataTypeKey}
            control={control}
            mode="time"
            action='secondary'
            otherStyles='w-2/5 items-start'
          />
          <DateTimeButton
            title={dateField.title}
            formDataTypeKey={dateField.formDataTypeKey}
            control={control}
            mode="date"
            action='tertiary'
            otherStyles='w-3/5 pl-5 items-end'
            isDisabled={isPeriodic}
          />
        </View>

        <CustomSwitch onFalseText='Jendorázová' onTrueText='Periodická' value={isPeriodic} onValueChange={handleSwitchChange} />

        {/* submit the activity */}
        <CustomButton
          title={props.title}
          handlePress={handleSubmit(props.onSubmit)}
          containerStyles="mt-7 h-[4.5rem] rounded-3xl"
          isLoading={isSubmitting}
        />
      </View>
    </ScrollView>
  )
}

export default ScheduleForm
