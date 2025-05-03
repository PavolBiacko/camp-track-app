import FinanceCalculationDistributionLine from '@/components/custom/finance/calculation/base/FinanceCalculationDistributionLine'
import { FinanceCalculationContentLineProps } from '@/types/finance'
import React from 'react'
import { Text, View } from 'react-native'

const FinanceCalculationContentLine = ({ child, distribution }: FinanceCalculationContentLineProps) => {
  return (
    <View className="w-full h-auto items-center justify-center rounded-xl border-2 border-outline-500">
      <View className='w-full bg-secondary-500 rounded-t-lg items-center py-2'>
        <Text className='text-typography-950 text-2xl font-psemibold mt-1'>
          {child.firstName} {child.lastName}
        </Text>
      </View>
      <View className='w-full items-center justify-center border-y-2 border-outline-500 py-5 gap-5'>
        {child.accountBalance > 0
          ? Object.entries(distribution[child.id])
            .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
            .map(([denomString, count], index) => (
              <FinanceCalculationDistributionLine
                key={index}
                count={count}
                denomination={parseFloat(denomString)}
              />
            ))
          : (
            <Text className='text-typography-950 text-3xl font-psemibold mt-2'>
              Nie je čo rozmienať.
            </Text>
          )}
      </View>
      <View className='w-full bg-tertiary-500 rounded-b-lg items-center py-2'>
        <Text className='text-typography-950 text-4xl font-pbold mt-3'>
          {child.accountBalance.toFixed(2)} €
        </Text>
      </View>
    </View>
  )
}

export default FinanceCalculationContentLine