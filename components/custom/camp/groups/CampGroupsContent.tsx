import EmptyScreenMessage from "@/components/custom/EmptyScreenMessage";
import CampSessionBox from "@/components/custom/camp/sessions/base/CampSessionBox";
import { ScrollView, View } from "react-native";

const dummyData: any[] = []

const CampGroupsContent = () => {
  if (dummyData.length === 0) {
    return <EmptyScreenMessage text='Neexistujú žiadne oddiely.' />;
  }

  return (
    <View className="h-[87.5%] border-t border-outline-500">
      <ScrollView contentContainerClassName="items-center gap-5 py-5">
        {dummyData.map((year, index) => (
          <CampSessionBox key={index} year={year} />
        ))}
      </ScrollView>
    </View>
  )
}

export default CampGroupsContent