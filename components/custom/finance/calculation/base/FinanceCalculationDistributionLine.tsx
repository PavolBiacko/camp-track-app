import { ArrowRightIcon, Icon } from '@/components/ui/icon'
import { Denominations } from '@/types/enums/finance'
import { FinanceCalculationDistributionLineProps } from '@/types/finance'
import { getMoneyImage, getMoneyType } from '@/utils/finance'
import React from 'react'
import { Image, Text, View } from 'react-native'

const FinanceCalculationDistributionLine = ({ child, distribution }: FinanceCalculationDistributionLineProps) => {
  return (
    <View className="w-full h-auto items-center justify-center rounded-xl border border-outline-500">
      <View className='w-full bg-secondary-500 rounded-t-xl items-center py-2'>
        <Text className='text-typography-950 text-2xl font-psemibold mt-1'>
          {child.firstName} {child.lastName}
        </Text>
      </View>
      <View className='w-full items-center justify-center border-y border-outline-500 py-5 gap-5'>
        {Object.entries(distribution[child.id])
          .filter(([, count]) => count > 0) // Only show denominations with count > 0
          .map(([denom, count], index) => (
            <View key={index} className='flex-row w-full items-center justify-between'>
              <View className='w-[45%] items-center'>
                <Text className='text-typography-950 text-3xl font-psemibold mt-2'>
                  {count} ×
                </Text>
              </View>
              <View className='items-center'>
                <Icon as={ArrowRightIcon} size='xl' />
              </View>
              <View className='w-[45%] items-center'>
                <Image
                  source={getMoneyImage(parseFloat(denom) as unknown as Denominations)}
                  resizeMode='contain'
                  className={`${getMoneyType(parseFloat(denom) as Denominations) === "bill" ? "w-24 h-14" : "w-14 h-14"}`}
                />
              </View>
            </View>
          ))}
      </View>
      <View className='w-full bg-tertiary-500 rounded-b-xl items-center py-2'>
        <Text className='text-typography-950 text-4xl font-psemibold mt-3'>
          {child.accountBalance.toFixed(2)} €
        </Text>
      </View>
    </View>
  )
}

export default FinanceCalculationDistributionLine