import CustomButton from '@/components/custom/CustomButton'
import CustomModal from '@/components/custom/CustomModal'
import FormField from '@/components/custom/FormField'
import MultiSelectButton from '@/components/custom/MultiSelectButton'
import SelectButton from '@/components/custom/SelectButton'
import { useManyCampSessions } from '@/hooks/models/useCampSessions'
import { useManyChildren } from '@/hooks/models/useChildren'
import { useManyUsers } from '@/hooks/models/useUsers'
import { mapManyCampSessionsToPickerItems } from '@/mappers/campSessions'
import { mapManyChilrenToPickerItems } from '@/mappers/children'
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
  const { control, handleSubmit, register, formState: { errors } } = useForm<T>({
    defaultValues: props.initialValues,
    resolver: zodResolver(props.validationSchema)
  })
  const { campSessions, isLoading: isLoadingCampSessions, isError: isErrorCampSessions } = useManyCampSessions();
  const { users, isLoading: isLoadingUsers, isError: isErrorUsers } = useManyUsers();
  const { children, isLoading: isLoadingChildren, isError: isErrorChildren } = useManyChildren();

  const { numberField, nameField, sessionField, leaderField, childrenField } = getCampGroupFromFields<T>(props.fields);

  return (
    <View className="w-full justify-center">
      <Text className="text-typography-950 text-2xl mt-5 font-pbold">{props.title}</Text>

      <View className='flex-row items-center justify-between w-full mt-4'>
        {/* number of the group */}
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
        {/* name of the group */}
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

      {/* session of the group */}
      <SelectButton
        title={sessionField.title}
        formDataTypeKey={sessionField.formDataTypeKey}
        control={control}
        error={errors[sessionField.formDataTypeKey as keyof FieldErrors<T>] as FieldError | undefined}
        action="secondary"
        options={mapManyCampSessionsToPickerItems(campSessions)}
        isLoading={!campSessions || isLoadingCampSessions || isErrorCampSessions}
        otherStyles={sessionField.otherStyles || "mt-4"}
      />

      {/* leader of the group */}
      <SelectButton
        title={leaderField.title}
        formDataTypeKey={leaderField.formDataTypeKey}
        control={control}
        error={errors[leaderField.formDataTypeKey as keyof FieldErrors<T>] as FieldError | undefined}
        action="tertiary"
        options={mapManyUsersToPickerItems(users)}
        isLoading={!users || isLoadingUsers || isErrorUsers}
        otherStyles={leaderField.otherStyles || "mt-4"}
      />

      {/* children of the group */}
      <MultiSelectButton
        title={childrenField.title}
        formDataTypeKey={childrenField.formDataTypeKey}
        control={control}
        error={errors[childrenField.formDataTypeKey as keyof FieldErrors<T>] as FieldError | undefined}
        action="quaternary"
        options={mapManyChilrenToPickerItems(children)}
        isLoading={!children || isLoadingChildren || isErrorChildren}
        otherStyles={childrenField.otherStyles || "mt-4"}
      />

      {/* submit the group */}
      <CustomButton
        title={props.buttonText || props.title}
        handlePress={() => setModalVisible(true)}
        textStyles='text-2xl'
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

export default CampGroupsForm
