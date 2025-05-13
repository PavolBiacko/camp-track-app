import CampSessionBox from "@/components/custom/camp/sessions/base/CampSessionBox";
import EmptyScreenMessage from "@/components/custom/EmptyScreenMessage";
import Loading from "@/components/custom/Loading";
import { useManyCampSessionsGrouped } from "@/hooks/models/useCampSessions";
import { ScrollView, View } from "react-native";

const CampSessionContent = () => {
  const { campSessionsGrouped, isLoading, isError } = useManyCampSessionsGrouped();

  if (!campSessionsGrouped || isLoading || isError) {
    return <Loading showText={false} />;
  }

  if (campSessionsGrouped.length === 0) {
    return <EmptyScreenMessage text='Neexistujú žiadne turnusy.' />;
  }

  return (
    <View className="h-[87.5%] border-y border-outline-500">
      <ScrollView contentContainerClassName="items-center gap-5 py-5">
        {campSessionsGrouped.map((year, index) => (
          <CampSessionBox key={index} year={year} />
        ))}
      </ScrollView>
    </View>
  )
}

export default CampSessionContent