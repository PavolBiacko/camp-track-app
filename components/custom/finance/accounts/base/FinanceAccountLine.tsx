import FinanceAccountActionModal from '@/components/custom/finance/accounts/base/FinanceAccountActionModal';
import { FinanceAccountLineProps } from '@/types/finance';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const FinanceAccountLine = (props: FinanceAccountLineProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { id, firstName, lastName, accountBalance } = props.child;

  const backgroundStyles: ClassNameValue = `bg-background-300 border-2 border-outline-500 ${props.containerStyles}`
  const textStyles: ClassNameValue = `text-2xl ${props.textStyles}`;
  const accountBalanceStyles: ClassNameValue = accountBalance < 0 ? "text-error-400" : "text-success-500";

  const handleAccountAction = () => {
    setModalVisible(true);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleAccountAction}
        className={
          twMerge(
            "flex-row justify-between items-center",
            "rounded-xl px-6 my-3 w-11/12 h-28",
            backgroundStyles
          )}>
        <View className='pt-1 gap-1'>
          <Text className={twMerge(textStyles, "font-pbold text-typography-800")}>{firstName}</Text>
          <Text className={twMerge(textStyles, "font-pbold text-typography-800")}>{lastName}</Text>
        </View>
        <Text className={
          twMerge(
            "font-psemibold text-success-500 pt-1",
            accountBalanceStyles,
            textStyles,
          )
        }>
          {accountBalance} €
        </Text>
      </TouchableOpacity>
      <FinanceAccountActionModal
        childId={id}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  )
}

export default FinanceAccountLine