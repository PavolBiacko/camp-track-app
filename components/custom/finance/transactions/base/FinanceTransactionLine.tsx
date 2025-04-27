import { Badge, BadgeText } from '@/components/ui/badge';
import { FinanceTransactionLineProps } from '@/types/finance';
import { formatISOLocalToHumanReadable } from '@/utils/dates';
import { getBadgeStylesAndTextForTransaction, getTransactionColorStyle } from '@/utils/ui';
import { Text, TouchableOpacity, View } from 'react-native';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const FinanceTransactionLine = (props: FinanceTransactionLineProps) => {
  const { child, amount, type, createdAt } = props.transaction;

  const colorStyle: ClassNameValue = getTransactionColorStyle(child, amount);  // can't be transaction with 0 amount
  const { text: badgeText, styles: badgeStyles } = getBadgeStylesAndTextForTransaction(type);

  return (
    <TouchableOpacity
      activeOpacity={(!child) ? 0.5 : 1}
      className={
        twMerge(
          "flex-row justify-between items-center",
          "rounded-xl px-4 w-11/12 h-28",
          `bg-background-${(child) ? "300" : "700"} border-2 border-${colorStyle}`,
        )}>
      <View className="items-start">
        <Text className="text-typography-800 font-plight text-sm">{formatISOLocalToHumanReadable(createdAt)}</Text>
        {child ? (
          <>
            <Text className="text-typography-900 font-pbold text-2xl pt-1">{child.firstName}</Text>
            <Text className="text-typography-900 font-pbold text-2xl pt-1">{child.lastName}</Text>
          </>
        ) : (
          <>
            <Text className="text-primary-500 font-pbold text-2xl pt-1">VYPLATENIE</Text>
            <Text className="text-primary-500 font-pbold text-2xl pt-1">BUFETU</Text>
          </>
        )}
      </View>
      <View className="items-end gap-4 mt-1">
        <Badge className={`rounded-xl ${badgeStyles}`}>
          <BadgeText className='text-typography-900 font-pbold text-sm px-2'>{badgeText}</BadgeText>
        </Badge>
        <Text className={`font-pbold text-4xl text-${colorStyle}`}>{amount} €</Text>
      </View>
    </TouchableOpacity>
  )
}

export default FinanceTransactionLine