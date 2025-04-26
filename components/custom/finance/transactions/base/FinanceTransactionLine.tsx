import { Badge, BadgeText } from '@/components/ui/badge';
import { FinanceTransactionLineProps } from '@/types/finance';
import { formatISOLocalToHumanReadable } from '@/utils/dates';
import { getBadgeStylesAndTextForTransaction } from '@/utils/ui';
import { Text, View } from 'react-native';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const FinanceTransactionLine = (props: FinanceTransactionLineProps) => {
  const { child, amount, type, createdAt } = props.transaction;

  const colorStyle: ClassNameValue = amount < 0 ? "error-400" : "success-500";  // can't be transaction with 0 amount
  const { text: badgeText, styles: badgeStyles } = getBadgeStylesAndTextForTransaction(type);

  return (
    <View
      className={
        twMerge(
          "flex-row justify-between items-center",
          "rounded-xl px-4 w-11/12 h-28",
          `bg-background-300 border-2 border-${colorStyle}`,
        )}>
      <View className="items-start">
        <Text className="text-typography-700 font-plight text-sm">{formatISOLocalToHumanReadable(createdAt)}</Text>
        <Text className="text-typography-900 font-pbold text-2xl pt-1">{child ? `${child.firstName}` : "BUFFET"}</Text>
        <Text className="text-typography-900 font-pbold text-2xl pt-1">{child ? `${child.lastName}` : "BUFFET"}</Text>
      </View>
      <View className="items-end gap-4 mt-1">
        <Badge className={`rounded-xl ${badgeStyles}`}>
          <BadgeText className='text-typography-900 font-pbold text-sm px-2'>{badgeText}</BadgeText>
        </Badge>
        <Text className={`font-pbold text-4xl text-${colorStyle}`}>{amount} €</Text>
      </View>
    </View>
  )
}

export default FinanceTransactionLine