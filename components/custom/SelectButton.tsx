import { PickerItem } from '@/types/base';
import { SelectButtonProps } from '@/types/custom/button';
import { useCallback, useState } from 'react';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { FlatList, Text, View } from 'react-native';
import CustomButton from './CustomButton';
import CustomModal from './CustomModal';
import SwitchableButton from './SwitchableButton';

const SelectButton = <T extends FieldValues>(props: SelectButtonProps<T>) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Define handleSelect outside of render, using useCallback to memoize it
  const handleSelect = useCallback(
    (item: PickerItem, onChange: (value: string | null) => void) => {
      onChange(item.id);
      (props.handleChange) && props.handleChange(item.id);
      setModalVisible(false);
    }, []
  );

  return (
    <Controller
      control={props.control}
      name={props.formDataTypeKey as Path<T>}
      render={({ field: { onChange, value } }) => {
        const selectedItem = props.options?.find(item => item.id === value) || null;

        return (
          <View className={`${props.otherStyles}`}>
            {props.title && (
              <Text className="text-typography-950 text-base font-psemibold pb-1">
                {props.title}
              </Text>
            )}
            <CustomButton
              title={`${selectedItem ? selectedItem.showedText : "---"}`}
              action={props.action}
              handlePress={() => setModalVisible(true)}
              textStyles="text-typography-950 text-2xl font-psemibold"
              isLoading={props.isLoading}
              isDisabled={props.isDisabled}
              containerStyles="h-20 rounded-2xl"
            />
            <CustomModal
              title={props.title}
              type="custom"
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              baseButtonText='Zavrieť'
              containerStyles='w-11/12 h-[70%]'>
              <View className="h-[75%] bg-background-200 border-2 border-outline-500">
                <FlatList
                  data={props.options}
                  keyExtractor={(item) => item.id ?? "NULL"}
                  renderItem={({ item }) => {
                    const isSelected = value === item.id;
                    return (
                      <SwitchableButton
                        item={item}
                        action={props.action}
                        isSelected={isSelected}
                        handleAction={() => handleSelect(item, onChange)}
                      />
                    )
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

export default SelectButton;