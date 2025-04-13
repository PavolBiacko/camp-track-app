import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext'
import { ArrowRightIcon, Icon } from '@/components/ui/icon'
import { FinanceOverviewLineProps } from '@/types/finance'
import { getMoneyImage, getMoneyType } from '@/utils/finance'
import { Image, Text, View } from 'react-native'

const FinanceOverviewLine = ({ denomination }: FinanceOverviewLineProps) => {
  const { quantities, updateQuantity } = useFinanceOverviewContext();
  const quantity = quantities[denomination];

  const handleIncrement = () => {
    updateQuantity(denomination, quantity + 1);
  };

  return (
    <View className='flex-row gap-3 items-center'>
      <Image
        source={getMoneyImage(denomination)}
        resizeMode='contain'
        className={`${getMoneyType(denomination) === "bill" ? "w-20 h-11" : "w-12 h-12"}`}
      />
      <Icon as={ArrowRightIcon} size='xl' />
      <Text className='text-typography-950 text-xl font-pbold'>{quantity} ×</Text>
    </View>
  )
}

export default FinanceOverviewLine