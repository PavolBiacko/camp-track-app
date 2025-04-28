import { FinanceBuffetSummaryProps } from '@/types/finance';
import { ScrollView, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

const FinanceBuffetSummary = ({ children, actionAmounts }: FinanceBuffetSummaryProps) => {
  return (
    <>
      <View className={
        twMerge(
          'justify-center items-center w-full mb-5 py-1',
          'border-2 border-outline-500 rounded-xl bg-background-300'
        )}>
        <Text className="text-secondary-500 text-2xl font-pbold mt-1">
          0.00 €
        </Text>
      </View>
      <View className='flex-1 w-full border-2 border-outline-500 rounded-xl bg-background-300'>
        <ScrollView
          contentContainerClassName="items-center py-2"
          nestedScrollEnabled={true}>
          {children.map((child, index) => (
            <View
              key={index}
              className="justify-center items-center bg-background-500 border border-outline-500 rounded-xl w-11/12 gap-4 py-2 my-3">
              <Text className="text-typography-950 text-2xl font-pbold mt-1">
                {child.firstName} {child.lastName}
              </Text>
              <Text className="text-typography-950 text-2xl font-pbold mt-1">
                {actionAmounts[child.id] || 0} €
              </Text>
              {/* <Image
                source={getMoneyImage(parseFloat(denomination) as Denominations)}
                resizeMode='contain'
                className={`${getMoneyType(parseFloat(denomination) as Denominations) === "bill" ? "w-28 h-16" : "w-16 h-16"}`}
              /> */}
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  )
}

export default FinanceBuffetSummary