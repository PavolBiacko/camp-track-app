import FinanceCalculationDistributionLine from '@/components/custom/finance/calculation/base/FinanceCalculationDistributionLine'
import { ArrowDownIcon, ArrowUpIcon, Icon } from '@/components/ui/icon'
import { FinanceCalculationContentProps } from '@/types/finance'
import { ScrollView, Text, View } from 'react-native'

const FinanceCalculationContent = (props: FinanceCalculationContentProps) => {
  return (
    <View className='h-[67%]'>
      <View className='flex-row justify-center items-center bg-background-300 border-y-2 border-outline-500 gap-5 py-2'>
        <Icon as={ArrowDownIcon} size='sm' />
        <Text className='text-typography-950 text-2xl text-center font-pbold'>
          Rozdelenie peňazí
        </Text>
        <Icon as={ArrowUpIcon} size='sm' />
      </View>
      <ScrollView contentContainerClassName="items-center gap-5 py-5 px-3">
        {props.children.map((child, index) => (
          <FinanceCalculationDistributionLine
            key={index}
            child={child}
            distribution={props.distribution}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default FinanceCalculationContent