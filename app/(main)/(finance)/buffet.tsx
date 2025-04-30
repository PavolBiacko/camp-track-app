import CustomButton from '@/components/custom/CustomButton';
import FinanceBuffetModal from '@/components/custom/finance/buffet/FinanceBuffetModal';
import FormField from '@/components/custom/FormField';
import Loading from '@/components/custom/Loading';
import { useChildrenByLeader } from '@/hooks/models/useChildren';
import useLocalStorage from '@/hooks/useLocalStorage';
import { FinanceBuffetData, FinanceBuffetParams, LocalBuffetActionAmounts } from '@/types/finance';
import { formatISOLocalToHumanReadable } from '@/utils/dates';
import { getLongerString } from '@/utils/strings';
import { getProperTextSizeForChildName } from '@/utils/ui';
import { buffetSchema } from '@/validation/finance';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

const Buffet = () => {
  const navigation = useNavigation();
  const { leaderId } = useLocalSearchParams<FinanceBuffetParams>();
  const { children, isLoading, isError } = useChildrenByLeader(leaderId);
  const [localActionAmounts, setLocalActionAmounts] = useLocalStorage<LocalBuffetActionAmounts>("actionAmounts", {});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const { control, register, handleSubmit, watch, reset, formState: { errors } } = useForm<FinanceBuffetData>({
    defaultValues: { actionAmount: null },
    resolver: zodResolver(buffetSchema),
  });

  // setting the header title based on current date
  useEffect(() => {
    navigation.setOptions({
      title: `Bufet (${formatISOLocalToHumanReadable(new Date())})`
    })
  }, []);

  if (!children || isLoading || isError) {
    return <Loading showText={false} />;
  }

  const nameSize = getProperTextSizeForChildName(getLongerString(children[currentIndex].firstName, children[currentIndex].lastName));
  const textStyles = "text-center font-pextrabold";

  const currentChild = children[currentIndex];
  const actionAmount = localActionAmounts[currentChild.id] || 0;

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

  const saveAmountLocally = (data: FinanceBuffetData) => {
    if (data.actionAmount! > currentChild.accountBalance) {
      Alert.alert(
        "Zamietnutá akcia",
        `Dieťa má na účte: ${currentChild.accountBalance.toFixed(2)} €.\nZadaná čiastka: ${data.actionAmount!.toFixed(2)} €.`
      );
      return;
    }
    setLocalActionAmounts((prev) => ({
      ...prev,
      [currentChild.id]: Number(data.actionAmount), // currentChild.id is a string, data.actionAmount is a number
    }));
    reset();
  };

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="min-h-48 justify-center items-center border-b border-outline-500">
          <Text className={twMerge("text-typography-950 pt-7", textStyles, nameSize)}>
            {currentChild.firstName}
          </Text>
          <Text className={twMerge("text-typography-950 pt-7", textStyles, nameSize)}>
            {currentChild.lastName}
          </Text>
        </View>

        <View className="min-h-20 justify-center items-center border-b border-outline-500 py-4">
          <Text className={twMerge("text-tertiary-500 text-6xl pt-4", textStyles)}>
            {(currentChild.accountBalance).toFixed(2)} €
          </Text>
          <Text className={twMerge("text-error-500 text-2xl pt-2", textStyles)}>
            (- {actionAmount.toFixed(2)} €)
          </Text>
        </View>

        <View className="min-h-20 justify-center items-center mx-10 my-5">
          <FormField
            formDataTypeKey='actionAmount'
            control={control}
            register={register}
            error={errors.actionAmount}
            maxLength={8}
            otherStyles='w-48'
          />
        </View>

        <View className="justify-center items-center border-t border-outline-500 gap-5 px-5 py-6">
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
              isDisabled={currentIndex === children.length - 1}
            />
          </View>

          <CustomButton
            title="Uložiť čiastku"
            action="secondary"
            handlePress={handleSubmit(saveAmountLocally)}
            containerStyles="rounded-3xl w-full h-16"
            textStyles="text-2xl"
            isDisabled={watch("actionAmount") === null || watch("actionAmount")!.toString().trim().length === 0}
          />

          <CustomButton
            title="Dokončiť návštevu bufetu"
            action="primary"
            handlePress={() => setModalVisible(true)}
            containerStyles="rounded-3xl w-full h-16"
            textStyles="text-2xl"
            isDisabled={currentIndex !== children.length - 1}
          />
        </View>
      </ScrollView>
      <FinanceBuffetModal
        children={children}
        actionAmounts={localActionAmounts}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default Buffet;