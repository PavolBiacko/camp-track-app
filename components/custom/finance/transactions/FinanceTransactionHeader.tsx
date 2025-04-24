import DateTimeButton from '@/components/custom/DateTimeButton';
import { formatDateToISOLocal } from '@/utils/dates';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

type FormData = {
  fromDate: string;
  toDate: string;
};

const FinanceTransactionHeader = () => {
  const { control, watch } = useForm<FormData>({
    defaultValues: {
      fromDate: formatDateToISOLocal(new Date()),
      toDate: formatDateToISOLocal(new Date()),
    },
  });

  // Watch the fromDate and toDate fields for changes
  const fromDate = watch('fromDate');
  const toDate = watch('toDate');

  const handleSubmit = () => {
    console.log('Form submitted with values:', { fromDate, toDate });
  }

  return (
    <View className="flex-row border-y border-outline-300 justify-center items-center h-1/5 gap-3">
      <DateTimeButton
        title="OD"
        formDataTypeKey="fromDate"
        control={control}
        mode="date"
        action="tertiary"
        handleSubmit={handleSubmit}
        titleStyles='text-xl ml-3'
        textStyles="text-2xl font-pbold mx-4"
      />
      <Text className="text-typography-950 text-2xl font-pbold mt-8">
        -
      </Text>
      <DateTimeButton
        title="DO"
        formDataTypeKey="toDate"
        control={control}
        mode="date"
        action="tertiary"
        handleSubmit={handleSubmit}
        titleStyles='text-xl ml-3'
        textStyles="text-2xl font-pbold mx-4"
      />
    </View>
  )
}

export default FinanceTransactionHeader