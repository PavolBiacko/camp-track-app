
import { ActivityStatus } from '@/types/enums/schedule';
import { FinanceTransactionLineProps } from '@/types/finance';
import { formatISOLocalToHumanReadable } from '@/utils/dates';
import { getActivityStyles } from '@/utils/ui';
import { Text, TouchableOpacity } from 'react-native';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const FinanceTransactionLine = (props: FinanceTransactionLineProps) => {
  const textStyles: ClassNameValue = `text-typography-900 text-lg pt-1`;
  const otherStyles: ClassNameValue = getActivityStyles(ActivityStatus.FUTURE, false);

  const { child, amount, type, date } = props.transaction;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => { }}
      className={
        twMerge(
          "justify-between items-center",
          "rounded-xl px-6 w-11/12 h-28",
          otherStyles
        )}>
      <Text className={twMerge(textStyles, "font-pbold")}>{child ? `${child.firstName} ${child.lastName}` : "BUFFET"}</Text>
      <Text className={twMerge(textStyles, "font-pbold")}>{type}</Text>
      <Text className={twMerge(textStyles, "font-pbold")}>{amount} {formatISOLocalToHumanReadable(date)}</Text>
    </TouchableOpacity>
  )
}

export default FinanceTransactionLine