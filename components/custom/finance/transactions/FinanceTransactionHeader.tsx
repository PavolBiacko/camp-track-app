import { useFinanceTransactionContext } from '@/components/custom/context/FinanceTransactionContext';
import DateTimeButton from '@/components/custom/DateTimeButton';
import { mapDateToDayEnd, mapDateToDayStart, mapStringToDateTime } from '@/mappers/datetime';
import { FinanceTransactionHeaderData } from '@/types/finance';
import { formatDateToISOLocal } from '@/utils/dates';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

const FinanceTransactionHeader = () => {
  const { dateFrom, dateTo, setDateFrom, setDateTo } = useFinanceTransactionContext();
  const { control, watch } = useForm<FinanceTransactionHeaderData>({
    defaultValues: { dateFrom: formatDateToISOLocal(dateFrom), dateTo: formatDateToISOLocal(dateTo) },
  });

  const handleSubmit = () => {
    const dateFromStart = mapDateToDayStart(mapStringToDateTime(watch('dateFrom'), "date"))
    const dateToEnd = mapDateToDayEnd(mapStringToDateTime(watch('dateTo'), "date"))
    setDateFrom(dateFromStart);
    setDateTo(dateToEnd);
  }

  return (
    <View className="flex-row border-y border-outline-300 justify-center items-center h-1/5 gap-3">
      <DateTimeButton
        title="OD"
        formDataTypeKey="dateFrom"
        control={control}
        mode="date"
        maximumDate={dateTo}
        action="tertiary"
        handleSubmit={handleSubmit}
        titleStyles='text-2xl ml-3'
        textStyles="text-2xl font-pbold mx-4"
      />
      <Text className="text-typography-950 text-2xl font-pbold mt-8">
        -
      </Text>
      <DateTimeButton
        title="DO"
        formDataTypeKey="dateTo"
        control={control}
        mode="date"
        minimumDate={dateFrom}
        action="tertiary"
        handleSubmit={handleSubmit}
        titleStyles='text-2xl ml-3'
        textStyles="text-2xl font-pbold mx-4"
      />
    </View>
  )
}

export default FinanceTransactionHeader