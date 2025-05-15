import { Image, TouchableOpacity, View } from "react-native";

const GalleryImageLine = ({ item }: { item: string[] }) => (
  <View className="flex-row w-full justify-center">
    {item.map((uri, index) => (
      <TouchableOpacity
        key={index}
        activeOpacity={0.5}
        className="w-32 h-32 border border-outline-500 m-1">
        <Image
          source={{ uri, cache: 'force-cache' }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </TouchableOpacity>
    ))}
  </View>
);

export default GalleryImageLine;