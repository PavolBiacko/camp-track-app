import { PickerItem, SelectButtonProps } from '@/types/custom/button';
import { useCallback, useState } from 'react';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import CustomButton from './CustomButton';
import CustomModal from './CustomModal';

const SelectButton = <T extends FieldValues>(props: SelectButtonProps<T>) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Define handleSelect outside of render, using useCallback to memoize it
  const handleSelect = useCallback(
    (item: PickerItem, onChange: (value: string | null) => void) => {
      onChange(item.id);
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
              containerStyles="h-20 rounded-2xl"
            />
            <CustomModal
              title={props.title}
              type="custom"
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              containerStyles='w-11/12 h-[70%]'>
              <View className="h-[75%] bg-background-200 border-2 border-outline-500">
                <FlatList
                  data={props.options}
                  keyExtractor={(item) => item.id ?? "NULL"}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      className={twMerge(
                        "border p-4",
                        item.id === value
                          ? `bg-${props.action}-300 border-${props.action}-700`
                          : "bg-background-300 border-outline-700"
                      )}
                      onPress={() => handleSelect(item, onChange)}>
                      <Text className="text-typography-950 text-xl text-center font-psemibold pt-1">
                        {item.showedText}
                      </Text>
                      {item.helperText && (
                        <Text className="text-typography-700 text-xs text-center font-pregular pt-1">
                          {item.helperText}
                        </Text>
                      )}
                    </TouchableOpacity>
                  )}
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