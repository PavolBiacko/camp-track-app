import { FinanceAccountContentProps } from '@/types/finance';
import { getDenominations } from '@/utils/finance';
import { ScrollView, Text, View } from 'react-native';

const FinanceAccountContent = ({ type }: FinanceAccountContentProps) => {
  const denominations = getDenominations();

  return (
    <ScrollView contentContainerClassName="items-center gap-5 py-5 mx-5">
      {denominations.map((denomination, index) => (
        <View key={index} className="flex-row items-center gap-5">
          <Text className="text-typography-950 text-2xl font-bold">{denomination}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

export default FinanceAccountContent