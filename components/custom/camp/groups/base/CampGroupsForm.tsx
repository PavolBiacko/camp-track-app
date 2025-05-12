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

// Define the type for the data
type PickerItem = {
  id: string;
  range: string;
};

// Sample data for the picker
const pickerData = [
  { id: '1', range: '1-5 years' },
  { id: '2', range: '6-10 years' },
  { id: '3', range: '11-15 years' },
  { id: '4', range: '16-20 years' },
  { id: '5', range: '21-25 years' },
  { id: '6', range: '26-30 years' },
  { id: '7', range: '31-35 years' },
  { id: '8', range: '36-40 years' },
  { id: '9', range: '41-45 years' },
  { id: '10', range: '46-50 years' },
  { id: '11', range: '51-55 years' },
  { id: '12', range: '56-60 years' },
  { id: '13', range: '61-65 years' },
  { id: '14', range: '66-70 years' },
  { id: '15', range: '71-75 years' },
  { id: '16', range: '76-80 years' },
  { id: '17', range: '81-85 years' },
  { id: '18', range: '86-90 years' },
  { id: '19', range: '91-95 years' },
  { id: '20', range: '96-100 years' },
];

const CampGroupsForm = <T extends GroupCreateFormInputs | GroupUpdateFormInputs>(props: FormProps<T>) => {
  const { control, handleSubmit, register, formState: { errors } } = useForm<T>({
    defaultValues: props.initialValues,
    resolver: zodResolver(props.validationSchema)
  })
  const { numberField, nameField, sessionField, leaderField } = getCampGroupFromFields<T>(props.fields);
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedPickerItem, setSelectedPickerItem] = useState<PickerItem | null>(null);

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
        action="secondary"
        data={pickerData}
        onSelect={(item) => {
          setSelectedPickerItem(item);
          console.log('Selected ID:', item.id); // You can access the selected id here
        }}
        otherStyles={sessionField.otherStyles || "mt-7"}
      />

      <SelectButton
        title={leaderField.title}
        action="tertiary"
        data={pickerData}
        onSelect={(item) => {
          setSelectedPickerItem(item);
          console.log('Selected ID:', item.id); // You can access the selected id here
        }}
        otherStyles={sessionField.otherStyles || "mt-7"}
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
