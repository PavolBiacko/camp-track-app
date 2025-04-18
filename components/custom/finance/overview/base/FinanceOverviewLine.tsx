import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext'
import { ArrowRightIcon, Icon } from '@/components/ui/icon'
import { FinanceOverviewLineProps } from '@/types/finance'
import { getMoneyImage, getMoneyType } from '@/utils/finance'
import { Image, Text, View } from 'react-native'

const FinanceOverviewLine = ({ denomination }: FinanceOverviewLineProps) => {
  const { quantities } = useFinanceOverviewContext();
  const quantity = quantities[denomination];

  return (
    <View className='flex-row gap-3 items-center'>
      <Image
        source={getMoneyImage(denomination)}
        resizeMode='contain'
        className={`${getMoneyType(denomination) === "bill" ? "w-20 h-11" : "w-12 h-12"}`}
      />
      <Icon as={ArrowRightIcon} size='xl' />
      <View className='flex-1 items-end mr-4'>
        <Text className='text-typography-950 text-xl font-pbold'>{quantity} ×</Text>
      </View>
    </View>
  )
}

export default FinanceOverviewLine