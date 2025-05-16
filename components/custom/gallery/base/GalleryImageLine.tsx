import CustomModal from "@/components/custom/CustomModal";
import { useDeleteImage } from "@/hooks/models/useImages";
import { useAuth } from "@/hooks/useAuth";
import { UserRoles } from "@/types/enums/roles";
import { GalleryImageLineProps } from "@/types/gallery";
import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

const GalleryImageLine = ({ item }: GalleryImageLineProps) => {
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState<boolean[]>(new Array(item.length).fill(false));
  const { deleteImage } = useDeleteImage();

  const toggleModal = (index: number) => {
    setModalVisible((prev) =>
      prev.map((visible, i) => (i === index ? !visible : visible))
    );
  };

  return (
    <View className="flex-row w-full justify-center">
      {item.map((uri, index) => (
        <View key={index}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => toggleModal(index)}
            className="w-32 h-32 border border-outline-500 m-1">
            <Image
              source={{ uri, cache: "force-cache" }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </TouchableOpacity>
          <CustomModal
            type={user?.role! === UserRoles.CAMP_LEADER ? "confirmation" : "custom"}
            handleConfirm={() => deleteImage(uri)}
            modalVisible={modalVisible[index]}
            setModalVisible={(visible: boolean) => {
              setModalVisible((prev) =>
                prev.map((v, i) => (i === index ? visible : v))
              );
            }}
            containerStyles="w-11/12 h-2/3 items-center justify-center"
            confirmButtonText="Zmazať"
            baseButtonText="Zrušiť">
            <Image
              source={{ uri, cache: "force-cache" }}
              className="w-full h-[80%]"
              resizeMode="contain"
            />
          </CustomModal>
        </View>
      ))}
    </View>
  );
};

export default GalleryImageLine;