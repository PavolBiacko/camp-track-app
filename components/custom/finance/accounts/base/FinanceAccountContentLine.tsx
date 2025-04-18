import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext'
import CustomButton from '@/components/custom/CustomButton'
import { FinanceAccountContentLineProps } from '@/types/finance'
import { getMoneyImage, getMoneyType } from '@/utils/finance'
import { Image, Text, View } from 'react-native'
import { ClassNameValue, twMerge } from 'tailwind-merge'

const FinanceAccountContentLine = (props: FinanceAccountContentLineProps) => {
  const { quantities } = useFinanceOverviewContext();
  const quantity = quantities[props.denomination];

  const coinImageStyles: ClassNameValue = (props.type === "increment" ? "w-16 h-16 mx-6" : "w-16 h-16 mx-4");
  const billImageStyles: ClassNameValue = (props.type === "increment" ? "w-28 h-16" : "w-24 h-16");

  return (
    <View className='flex-row items-center gap-5'>
      <CustomButton
        title={"-"}
        action="error"
        handlePress={() => { }}
        textStyles="text-2xl"
        containerStyles="px-5 rounded-full w-16 h-16"
      />
      <Image
        source={getMoneyImage(props.denomination)}
        resizeMode='contain'
        className={`${getMoneyType(props.denomination) === "bill" ? billImageStyles : coinImageStyles}`}
      />
      <CustomButton
        title={"+"}
        action="success"
        handlePress={() => { }}
        textStyles="text-2xl"
        containerStyles="px-5 rounded-full w-16 h-16"
      />
      <View className='flex-1 items-end'>
        <Text className={
          twMerge(
            'text-typography-950 font-pbold',
            (props.type === "increment" ? "text-2xl" : "text-xl")
          )
        }>
          {(props.type === "increment") ? "0 ×" : `0/${quantity}`}
        </Text>
      </View>
    </View>
  )
}

export default FinanceAccountContentLine