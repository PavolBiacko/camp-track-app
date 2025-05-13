import CustomButton from '@/components/custom/CustomButton'
import CustomModal from '@/components/custom/CustomModal'
import FormField from '@/components/custom/FormField'
import SelectButton from '@/components/custom/SelectButton'
import { useManyCampSessions } from '@/hooks/models/useCampSessions'
import { useManyUsers } from '@/hooks/models/useUsers'
import { mapManyCampSessionsToPickerItems } from '@/mappers/campSessions'
import { mapManyUsersToPickerItems } from '@/mappers/users'
import { FormProps } from '@/types/custom/form'
import { GroupCreateFormInputs, GroupUpdateFormInputs } from '@/types/models/groups'
import { getCampGroupFromFields } from '@/utils/camp'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FieldError, FieldErrors, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'

const CampGroupsForm = <T extends GroupCreateFormInputs | GroupUpdateFormInputs>(props: FormProps<T>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { control, handleSubmit, register, watch, formState: { errors } } = useForm<T>({
    defaultValues: props.initialValues,
    resolver: zodResolver(props.validationSchema)
  })
  const { campSessions, isLoading: isLoadingCampSessions, isError: isErrorCampSessions } = useManyCampSessions();
  const { users, isLoading: isLoadingUsers, isError: isErrorUsers } = useManyUsers();

  const { numberField, nameField, sessionField, leaderField } = getCampGroupFromFields<T>(props.fields);

  console.log("CampGroupForm: ", watch());

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
        options={mapManyCampSessionsToPickerItems(campSessions)}
        isLoading={!campSessions || isLoadingCampSessions || isErrorCampSessions}
        otherStyles={sessionField.otherStyles || "mt-7"}
      />

      <SelectButton
        title={leaderField.title}
        formDataTypeKey={leaderField.formDataTypeKey}
        control={control}
        error={errors[leaderField.formDataTypeKey as keyof FieldErrors<T>] as FieldError | undefined}
        action="tertiary"
        options={mapManyUsersToPickerItems(users)}
        isLoading={!users || isLoadingUsers || isErrorUsers}
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
