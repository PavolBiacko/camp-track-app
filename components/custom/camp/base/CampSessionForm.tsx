import CustomButton from '@/components/custom/CustomButton'
import DateTimeButton from '@/components/custom/DateTimeButton'
import { mapStringToDateTime } from '@/mappers/datetime'
import { FormProps } from '@/types/custom/form'
import { CampSessionCreate, CampSessionUpdate } from '@/types/models/campSessions'
import { getCampSessionFormFields } from '@/utils/camp'
import { zodResolver } from '@hookform/resolvers/zod'
import { Path, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'

const CampSessionForm = <T extends CampSessionCreate | CampSessionUpdate>(props: FormProps<T>) => {
  const { control, handleSubmit, watch, formState: { isSubmitting } } = useForm<T>({
    defaultValues: props.initialValues,
    resolver: zodResolver(props.validationSchema)
  })
  const { beginDate, endDate } = getCampSessionFormFields<T>(props.fields);

  return (
    <View className="w-full justify-center">
      <Text className="text-typography-950 text-2xl mt-5 font-pbold">{props.title}</Text>

      <View className="w-full justify-between mt-7 gap-7">
        <DateTimeButton
          title={beginDate.title}
          formDataTypeKey={beginDate.formDataTypeKey}
          control={control}
          mode="date"
          maximumDate={mapStringToDateTime(watch("endDate" as Path<T>)!, "date")}
          action='tertiary'
          textStyles='text-3xl font-pbold mt-2'
          otherStyles='w-full items-start'
        />
        <DateTimeButton
          title={endDate.title}
          formDataTypeKey={endDate.formDataTypeKey}
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
        handlePress={handleSubmit(props.onSubmit)}
        containerStyles="h-[4.5rem] rounded-3xl mt-10"
        isLoading={isSubmitting}
      />
    </View>
  )
}

export default CampSessionForm
