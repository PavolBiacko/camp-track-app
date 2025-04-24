import { useFinanceAccountContext } from '@/components/custom/context/FinanceAccountContext';
import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext';
import { ArrowRightIcon, Icon } from '@/components/ui/icon';
import { Denominations } from '@/types/enums/finance';
import { FinanceAccountActionSummaryProps } from '@/types/finance';
import { getMoneyImage, getMoneyType } from '@/utils/finance';
import React, { useMemo } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

const FinanceAccountActionSummary = (props: FinanceAccountActionSummaryProps) => {
  const { childAccountBalance, actionAmount, counts } = useFinanceAccountContext();
  const { quantities } = useFinanceOverviewContext();

  const result = useMemo(() => {
    return (props.type === "increment") ? childAccountBalance + actionAmount : childAccountBalance - actionAmount
  }, [childAccountBalance, actionAmount]);

  return (
    <>
      <View className={
        twMerge(
          'justify-center items-center w-full mb-5 py-1',
          'border-2 border-outline-500 rounded-xl bg-background-300'
        )}>
        <Text className="text-typography-950 text-2xl font-pbold mt-1 border-b border-outline-500">
          {childAccountBalance.toFixed(2)} €
          {(props.type === "increment") ? " + " : " - "}
          {actionAmount.toFixed(2)} €
        </Text>
        <Text className="text-secondary-500 text-2xl font-pbold mt-1">
          {result.toFixed(2)} €
        </Text>
      </View>
      <View className='flex-1 w-full border-2 border-outline-500 rounded-xl bg-background-300'>
        <ScrollView
          contentContainerClassName="items-center py-4"
          nestedScrollEnabled={true}>
          {Object.entries(counts)
            .filter(([, count]) => count !== 0)
            .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
            .map(([denomination, count]) => (
              <View
                key={denomination}
                className="flex-row justify-center items-center w-full gap-8 my-5">
                <Image
                  source={getMoneyImage(parseFloat(denomination) as Denominations)}
                  resizeMode='contain'
                  className={`${getMoneyType(parseFloat(denomination) as Denominations) === "bill" ? "w-28 h-16" : "w-16 h-16"}`}
                />
                <Icon as={ArrowRightIcon} size='xl' />
                <Text className="text-typography-950 text-2xl font-pbold mt-1">
                  {(props.type === "increment") ? `${count} ×` : `${count}/${quantities[parseFloat(denomination) as Denominations]}`}
                </Text>
              </View>
            ))}
        </ScrollView>
      </View>
    </>
  )
}

export default FinanceAccountActionSummary