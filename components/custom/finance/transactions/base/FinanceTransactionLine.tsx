import FinanceTransactionLineText from '@/components/custom/finance/transactions/base/FinanceTransactionLineText';
import { Badge, BadgeText } from '@/components/ui/badge';
import { FinanceTransactionLineProps } from '@/types/finance';
import { formatISOLocalToHumanReadable } from '@/utils/dates';
import { getBadgeStylesAndTextForTransaction, getTransactionColorStyle } from '@/utils/ui';
import { Text, TouchableOpacity, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

const FinanceTransactionLine = (props: FinanceTransactionLineProps) => {
  const { child, amount, type, createdAt } = props.transaction;

  const { borderStyles, textStyles } = getTransactionColorStyle(child, amount);
  const { text: badgeText, styles: badgeStyles } = getBadgeStylesAndTextForTransaction(type);

  return (
    <TouchableOpacity
      activeOpacity={(!child) ? 0.5 : 1}
      className={
        twMerge(
          "flex-row justify-between items-center",
          "rounded-xl px-4 w-11/12 h-28",
          `bg-background-${(child) ? "300" : "700"} border-2 ${borderStyles}`,
        )}>
      <View className="items-start">
        <Text className="text-typography-800 font-plight text-sm">{formatISOLocalToHumanReadable(createdAt)}</Text>
        <FinanceTransactionLineText
          child={child}
          type={type}
        />
      </View>
      <View className="items-end gap-4 mt-1">
        <Badge className={`rounded-xl ${badgeStyles}`}>
          <BadgeText className='text-typography-900 font-pbold text-sm px-2'>{badgeText}</BadgeText>
        </Badge>
        <Text className={`font-pbold text-3xl ${textStyles}`}>{amount.toFixed(2)} €</Text>
      </View>
    </TouchableOpacity>
  )
}

export default FinanceTransactionLine