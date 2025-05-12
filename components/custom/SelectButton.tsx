import { PickerItem, SelectButtonProps } from '@/types/custom/button';
import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from './CustomButton';
import CustomModal from './CustomModal';

const SelectButton = ({ data, onSelect, ...props }: SelectButtonProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PickerItem | null>(null);

  // Handle item selection
  const handleSelect = (item: PickerItem) => {
    setSelectedItem(item);
    onSelect(item); // Pass the selected item (with id and range) to the parent
    setModalVisible(false);
  };

  return (
    <View className={`${props.otherStyles}`}>
      {props.title &&
        <Text className="text-typography-950 text-base font-psemibold pb-1">
          {props.title}
        </Text>
      }
      <CustomButton
        title={`${selectedItem ? selectedItem.range : "Vyber možnosť"}`}
        action={props.action}
        handlePress={() => setModalVisible(true)}
        textStyles="text-typography-950 text-2xl font-psemibold"
        containerStyles="h-20 rounded-2xl"
      />
      <CustomModal
        title={props.title}
        type="custom"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        containerStyles='w-11/12 h-[60%]'>
        <View className="h-[70%] bg-background-200 border-2 border-outline-500 rounded-xl p-3">
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.5}
                className="bg-background-300 border-2 border-secondary-500 rounded-xl p-4 my-2"
                onPress={() => handleSelect(item)}
              >
                <Text className="text-typography-950 text-lg text-center font-psemibold">
                  {item.range}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </CustomModal>
    </View>
  );
};

export default SelectButton;