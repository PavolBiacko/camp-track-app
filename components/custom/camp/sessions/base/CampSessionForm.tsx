import CustomButton from '@/components/custom/CustomButton'
import CustomModal from '@/components/custom/CustomModal'
import DateTimeButton from '@/components/custom/DateTimeButton'
import { mapStringToDateTime } from '@/mappers/datetime'
import { FormProps } from '@/types/custom/form'
import { CampSessionCreate, CampSessionUpdate } from '@/types/models/campSessions'
import { getCampSessionFormFields } from '@/utils/camp'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Path, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'

const CampSessionForm = <T extends CampSessionCreate | CampSessionUpdate>(props: FormProps<T>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { control, handleSubmit, watch } = useForm<T>({
    defaultValues: props.initialValues,
    resolver: zodResolver(props.validationSchema)
  })

  const { beginDateField, endDateField } = getCampSessionFormFields<T>(props.fields);

  return (
    <View className="w-full justify-center">
      <Text className="text-typography-950 text-2xl mt-5 font-pbold">
        {props.title}
      </Text>

      <View className="w-full justify-between mt-7 gap-7">
        <DateTimeButton
          title={beginDateField.title}
          formDataTypeKey={beginDateField.formDataTypeKey}
          control={control}
          mode="date"
          maximumDate={mapStringToDateTime(watch("endDate" as Path<T>)!, "date")}
          action='tertiary'
          textStyles='text-3xl font-pbold mt-2'
          otherStyles='w-full items-start'
        />
        <DateTimeButton
          title={endDateField.title}
          formDataTypeKey={endDateField.formDataTypeKey}
          control={control}
          mode="date"
          minimumDate={mapStringToDateTime(watch('beginDate' as Path<T>)!, "date")}
          action='tertiary'
          titleStyles='self-start'
          textStyles='text-3xl font-pbold mt-2'
          otherStyles='w-full items-end'
        />
      </View>

      {/* submit the camp session */}
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

export default CampSessionForm
