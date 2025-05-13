import CustomButton from '@/components/custom/CustomButton'
import CustomModal from '@/components/custom/CustomModal'
import FormField from '@/components/custom/FormField'
import SelectButton from '@/components/custom/SelectButton'
import { FormProps } from '@/types/custom/form'
import { GroupCreateFormInputs, GroupUpdateFormInputs } from '@/types/models/groups'
import { getCampGroupFromFields } from '@/utils/camp'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FieldError, FieldErrors, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'

// Sample data for the picker
const pickerData = [
  { id: null, showedText: '-' },
  { id: '1', showedText: '1-5 years' },
  { id: '2', showedText: '6-10 years' },
  { id: '3', showedText: '11-15 years' },
  { id: '4', showedText: '16-20 years' },
  { id: '5', showedText: '21-25 years' },
  { id: '6', showedText: '26-30 years' },
  { id: '7', showedText: '31-35 years' },
  { id: '8', showedText: '36-40 years' },
  { id: '9', showedText: '41-45 years' },
  { id: '10', showedText: '46-50 years' },
  { id: '11', showedText: '51-55 years' },
  { id: '12', showedText: '56-60 years' },
  { id: '13', showedText: '61-65 years' },
  { id: '14', showedText: '66-70 years' },
  { id: '15', showedText: '71-75 years' },
  { id: '16', showedText: '76-80 years' },
  { id: '17', showedText: '81-85 years' },
  { id: '18', showedText: '86-90 years' },
  { id: '19', showedText: '91-95 years' },
  { id: '20', showedText: '96-100 years' },
];

const CampGroupsForm = <T extends GroupCreateFormInputs | GroupUpdateFormInputs>(props: FormProps<T>) => {
  const { control, handleSubmit, register, watch, formState: { errors } } = useForm<T>({
    defaultValues: props.initialValues,
    resolver: zodResolver(props.validationSchema)
  })
  const { numberField, nameField, sessionField, leaderField } = getCampGroupFromFields<T>(props.fields);
  const [modalVisible, setModalVisible] = useState(false);

  console.log(watch())

  return (
    <View className="w-full justify-center">
      <Text className="text-typography-950 text-2xl mt-5 font-pbold">{props.title}</Text>

      <View className='flex-row items-center justify-between w-full mt-7'>
        <FormField
          title={numberField.title}
          control={control}
          register={register}
          error={errors[numberField.formDataTypeKey as keyof FieldErrors<T>] as FieldError | undefined}
          formDataTypeKey={numberField.formDataTypeKey}
          placeholder={numberField.placeholder}
          maxLength={2}
          otherStyles={numberField.otherStyles || 'w-[22.5%]'}
        />
        <FormField
          title={nameField.title}
          control={control}
          register={register}
          error={errors[nameField.formDataTypeKey as keyof FieldErrors<T>] as FieldError | undefined}
          formDataTypeKey={nameField.formDataTypeKey}
          placeholder={nameField.placeholder}
          otherStyles={numberField.otherStyles || 'w-[72.5%]'}
        />
      </View>

      <SelectButton
        title={sessionField.title}
        formDataTypeKey={sessionField.formDataTypeKey}
        control={control}
        error={errors[sessionField.formDataTypeKey as keyof FieldErrors<T>] as FieldError | undefined}
        action="secondary"
        options={pickerData}
        otherStyles={sessionField.otherStyles || "mt-7"}
      />

      <SelectButton
        title={leaderField.title}
        formDataTypeKey={leaderField.formDataTypeKey}
        control={control}
        error={errors[leaderField.formDataTypeKey as keyof FieldErrors<T>] as FieldError | undefined}
        action="tertiary"
        options={pickerData}
        otherStyles={leaderField.otherStyles || "mt-7"}
      />

      {/* submit the child */}
      <CustomButton
        title={props.buttonText || props.title}
        handlePress={() => setModalVisible(true)}
        containerStyles="h-[4.5rem] rounded-3xl mt-14"
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

export default CampGroupsForm
