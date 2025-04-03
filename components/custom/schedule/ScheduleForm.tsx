import CustomButton from '@/components/custom/CustomButton'
import CustomSwitch from '@/components/custom/CustomSwitch'
import DateTimeButton from '@/components/custom/DateTimeButton'
import FormField from '@/components/custom/FormField'
import { FormProps } from '@/types/custom/form'
import { AddActivity } from '@/types/models/activities'
import { capitalizeWord, getScheduleFormFields } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { ScrollView, Text, View } from 'react-native'

const ScheduleForm = (props: FormProps<AddActivity>) => {

  const { control, handleSubmit, register, formState: { isSubmitting, errors } } = useForm<AddActivity>({
    defaultValues: props.initialValues,
    resolver: zodResolver(props.validationSchema)
  })

  const [isPeriodic, setIsPeriodic] = useState(false);

  const { nameField, descriptionField, timeField, dateField } = getScheduleFormFields(props.fields);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View className="w-full justify-center px-4 my-6">
        <Text className="text-typography-950 text-2xl mt-5 font-pbold">{props.title}</Text>

        {/* name of the activity */}
        <FormField
          title={capitalizeWord(nameField.title)!}
          control={control}
          register={register}
          error={errors[nameField.formDataTypeKey] as FieldError | undefined}
          formDataTypeKey={nameField.formDataTypeKey}
          placeholder={nameField.placeholder}
          otherStyles={nameField.otherStyles || "mt-7"}
        />

        {/* description of the activity */}
        <FormField
          title={capitalizeWord(descriptionField.title)!}
          control={control}
          register={register}
          error={errors[descriptionField.formDataTypeKey] as FieldError | undefined}
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
            error={errors[timeField.formDataTypeKey] as FieldError | undefined}
            action='secondary'
            otherStyles='w-2/5 items-start'
          />
          <DateTimeButton
            title={dateField.title}
            formDataTypeKey={dateField.formDataTypeKey}
            control={control}
            mode="date"
            error={errors[dateField.formDataTypeKey] as FieldError | undefined}
            action='tertiary'
            otherStyles='w-3/5 pl-5 items-end'
            isDisabled={isPeriodic}
          />
        </View>

        <CustomSwitch onFalseText='Jendorázová' onTrueText='Periodická' value={isPeriodic} onValueChange={setIsPeriodic} />

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
