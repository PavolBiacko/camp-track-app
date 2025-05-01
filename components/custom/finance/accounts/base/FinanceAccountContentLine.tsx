import { useFinanceAccountContext } from '@/components/custom/context/FinanceAccountContext'
import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext'
import CustomButton from '@/components/custom/CustomButton'
import { FinanceAccountContentLineProps } from '@/types/finance'
import { getActionAccountType, getMoneyImage, getMoneyType, isIncrementAvailable } from '@/utils/finance'
import { Image, Text, View } from 'react-native'
import { ClassNameValue, twMerge } from 'tailwind-merge'

const FinanceAccountContentLine = (props: FinanceAccountContentLineProps) => {
  const { quantities } = useFinanceOverviewContext();
  const { counts, updateCount, childAccountBalance, actionAmount, transactionType } = useFinanceAccountContext();

  const quantity = quantities[props.denomination];
  const count = counts[props.denomination];

  const coinImageStyles: ClassNameValue = (getActionAccountType(transactionType) === "increment" ? "w-16 h-16 mx-6" : "w-16 h-16 mx-4");
  const billImageStyles: ClassNameValue = (getActionAccountType(transactionType) === "increment" ? "w-28 h-16" : "w-24 h-16");

  const handleIncrement = () => {
    if (isIncrementAvailable(transactionType, props.denomination, quantity, count, childAccountBalance, actionAmount)) {
      updateCount(props.denomination, count + 1);
    }
  }

  const handleDecrement = () => {
    if (count > 0) {
      updateCount(props.denomination, count - 1);
    }
  }

  return (
    <View className='flex-row items-center gap-5'>
      <CustomButton
        title={"-"}
        action="error"
        handlePress={handleDecrement}
        textStyles="text-2xl"
        containerStyles="px-5 rounded-full w-16 h-16"
        isDisabled={count === 0}
      />
      <Image
        source={getMoneyImage(props.denomination)}
        resizeMode='contain'
        className={`${getMoneyType(props.denomination) === "bill" ? billImageStyles : coinImageStyles}`}
      />
      <CustomButton
        title={"+"}
        action="success"
        handlePress={handleIncrement}
        textStyles="text-2xl"
        containerStyles="px-5 rounded-full w-16 h-16"
        isDisabled={!isIncrementAvailable(transactionType, props.denomination, quantity, count, childAccountBalance, actionAmount)}
      />
      <View className='flex-1 items-center'>
        <Text className={
          twMerge(
            'text-typography-950 font-pbold',
            (getActionAccountType(transactionType) === "increment" ? "text-2xl" : "text-xl")
          )
        }>
          {(getActionAccountType(transactionType) === "increment") ? `${count} ×` : `${count}/${quantity}`}
        </Text>
      </View>
    </View>
  )
}

export default FinanceAccountContentLine