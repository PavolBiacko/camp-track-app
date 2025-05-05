import CustomButton from '@/components/custom/CustomButton'
import CustomModal from '@/components/custom/CustomModal'
import CustomRadioGroup from '@/components/custom/CustomRadioGroup'
import DateTimeButton from '@/components/custom/DateTimeButton'
import FormField from '@/components/custom/FormField'
import { FormProps } from '@/types/custom/form'
import { Gender } from '@/types/enums/gender'
import { ChildCreate, ChildUpdate } from '@/types/models/children'
import { getCampChildrenFormFields } from '@/utils/camp'
import { capitalizeWord } from '@/utils/strings'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FieldError, FieldErrors, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'

const CampChildrenForm = <T extends ChildCreate | ChildUpdate>(props: FormProps<T>) => {
  const { control, handleSubmit, register, formState: { errors } } = useForm<T>({
    defaultValues: props.initialValues,
    resolver: zodResolver(props.validationSchema)
  })
  const { firstNameField, lastNameField, birthDateField, genderField } = getCampChildrenFormFields<T>(props.fields);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="w-full justify-center">
      <Text className="text-typography-950 text-2xl mt-5 font-pbold">{props.title}</Text>

      {/* first name of the child */}
      <FormField
        title={capitalizeWord(firstNameField.title)!}
        control={control}
        register={register}
        error={errors[firstNameField.formDataTypeKey as keyof FieldErrors<T>] as FieldError | undefined}
        formDataTypeKey={firstNameField.formDataTypeKey}
        placeholder={firstNameField.placeholder}
        otherStyles={firstNameField.otherStyles || "mt-4"}
      />

      {/* last name of the child */}
      <FormField
        title={capitalizeWord(lastNameField.title)!}
        control={control}
        register={register}
        error={errors[lastNameField.formDataTypeKey as keyof FieldErrors<T>] as FieldError | undefined}
        formDataTypeKey={lastNameField.formDataTypeKey}
        placeholder={lastNameField.placeholder}
        otherStyles={lastNameField.otherStyles || "mt-4"}
      />

      {/* birth date of the child */}
      <DateTimeButton
        title={birthDateField.title}
        formDataTypeKey={birthDateField.formDataTypeKey}
        control={control}
        mode="date"
        isSpinner={true}
        maximumDate={new Date()}
        action='tertiary'
        textStyles='text-3xl font-pbold mt-2'
        otherStyles={birthDateField.otherStyles || "mt-4"}
      />

      {/* gender of the child */}
      <CustomRadioGroup
        title={genderField.title}
        formDataTypeKey={genderField.formDataTypeKey}
        control={control}
        radioOptions={[
          { label: "Chlapec", value: Gender.MALE },
          { label: "Dievča", value: Gender.FEMALE },
        ]}
        containterStyles={genderField.otherStyles || "mt-4"}
        error={errors[genderField.formDataTypeKey as keyof FieldErrors<T>] as FieldError | undefined}
      />

      {/* submit the child */}
      <CustomButton
        title={props.buttonText || props.title}
        handlePress={() => setModalVisible(true)}
        containerStyles="h-[4.5rem] rounded-3xl mt-10"
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

export default CampChildrenForm
