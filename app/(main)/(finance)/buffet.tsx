import CustomButton from '@/components/custom/CustomButton';
import Loading from '@/components/custom/Loading';
import { useChildrenByLeader } from '@/hooks/models/useFinance';
import { FinanceBuffetParams } from '@/types/finance';
import { getLongerString, getProperTextSizeForChildName } from '@/utils/strings';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

// Dummy data for 10 children
const dummyChildren = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  first_name: `Pavol ${index + 1}`,
  last_name: `Biačko ${index + 1}`,
  credit_balance: 50 - index * 5, // Just for variety
}));

const Buffet = () => {
  const { leaderId } = useLocalSearchParams<FinanceBuffetParams>();
  const { children, isLoading, isError } = useChildrenByLeader(leaderId);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!children || isLoading || isError) {
    return <Loading showText={false} />;
  }

  const nameSize = getProperTextSizeForChildName(getLongerString(children[currentIndex].firstName, children[currentIndex].lastName));
  const textStyles = "text-center pt-7 font-pextrabold";

  const currentChild = children[currentIndex];

  const handleNext = () => {
    if (currentIndex < children.length - 1) {
      setCurrentIndex((currentIndex) => currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((currentIndex) => currentIndex - 1);
    }
  };

  return (
    <View className="justify-center h-full">
      <View className="h-[25%] justify-center items-center border-b border-outline-500">
        <Text className={twMerge("text-typography-950", textStyles, nameSize)}>
          {currentChild.firstName}
        </Text>
        <Text className={twMerge("text-typography-950", textStyles, nameSize)}>
          {currentChild.lastName}
        </Text>

      </View>

      <View className="h-[15%] justify-center items-center border-b border-outline-500">
        <Text className={twMerge("text-tertiary-500 text-6xl", textStyles)}>
          {currentChild.accountBalance} €
        </Text>

      </View>

      <View className="h-[20%] justify-center items-center">
        <Text className="text-typography-950 text-center text-xl">
          Add purchase logic here (e.g., select products or custom amount)
        </Text>
      </View>

      <View className="h-[40%] justify-center items-center gap-5 px-5 border-t border-outline-500">
        <View className="flex-row gap-2 h-16">
          <CustomButton
            title="Späť"
            action="background"
            handlePress={handlePrevious}
            containerStyles="rounded-3xl w-[50%]"
            textStyles="text-2xl"
            isDisabled={currentIndex === 0}
          />
          <CustomButton
            title="Ďalej"
            action="background"
            handlePress={handleNext}
            containerStyles="rounded-3xl w-[50%]"
            textStyles="text-2xl"
            isDisabled={currentIndex === dummyChildren.length - 1}
          />
        </View>

        <CustomButton
          title="Dočasne uložiť"
          action="secondary"
          handlePress={() => {
            // Placeholder for saving the transaction
            console.log(`Saving transaction for ${currentChild.firstName}`);
          }}
          containerStyles="rounded-3xl w-full h-16"
          textStyles="text-2xl"
        />

        <CustomButton
          title="Dokončiť návštevu bufetu"
          action="primary"
          handlePress={() => router.back()}
          containerStyles="rounded-3xl w-full h-16"
          textStyles="text-2xl"
        />
      </View>
    </View>
  );
};

export default Buffet;