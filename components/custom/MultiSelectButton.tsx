import { PickerItemWithoutNull } from '@/types/base';
import { MultiSelectButtonProps } from '@/types/custom/button';
import { getChildrenButtonTextFormated } from '@/utils/camp';
import { useCallback, useState } from 'react';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { FlatList, Text, View } from 'react-native';
import CustomButton from './CustomButton';
import CustomModal from './CustomModal';
import SwitchableButton from './SwitchableButton';

const MultiSelectButton = <T extends FieldValues>(props: MultiSelectButtonProps<T>) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Define handleMultiSelect outside of render, using useCallback to memoize it
  const handleMultiSelect = useCallback(
    (item: PickerItemWithoutNull, value: string[], onChange: (value: string[]) => void) => {
      const isSelected = value?.includes(item.id!);
      const newValue = isSelected
        ? value.filter((id: string) => id !== item.id!)
        : [...(value || []), item.id!];
      onChange(newValue);
    }, []
  );

  return (
    <Controller
      control={props.control}
      name={props.formDataTypeKey as Path<T>}
      render={({ field: { onChange, value } }) => {
        return (
          <View className={`w-full ${props.otherStyles}`}>
            {props.title && (
              <Text className="text-typography-950 text-base font-psemibold pb-1">
                {props.title}
              </Text>
            )}
            <CustomButton
              title={getChildrenButtonTextFormated(value.length)}
              action={"quaternary"}
              handlePress={() => setModalVisible(true)}
              textStyles="text-typography-950 text-2xl font-psemibold"
              isLoading={props.isLoading}
              containerStyles="h-20 rounded-2xl"
            />
            <CustomModal
              title={props.title}
              type="custom"
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              baseButtonText='OK'
              containerStyles='w-11/12 h-[70%]'>
              <View className="h-[75%] bg-background-200 border-2 border-outline-500">
                <FlatList
                  data={props.options}
                  keyExtractor={(item) => item.id ?? "NULL"}
                  renderItem={({ item }) => {
                    const isSelected: boolean = value.includes(item.id);
                    return (
                      <SwitchableButton
                        item={item}
                        action={props.action}
                        isSelected={isSelected}
                        handleAction={() => handleMultiSelect(item, value, onChange)}
                      />
                    );
                  }}
                />
              </View>
            </CustomModal>
            {props.error && (
              <Text className="text-error-500 text-center font-plight mt-1">
                {props.error.message}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
};

export default MultiSelectButton;