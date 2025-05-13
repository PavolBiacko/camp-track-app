import CampGroupsBox from "@/components/custom/camp/groups/base/CampGroupsBox";
import EmptyScreenMessage from "@/components/custom/EmptyScreenMessage";
import Loading from '@/components/custom/Loading';
import { useAllGroupsGroupedBySession } from "@/hooks/models/useGroups";
import { ScrollView, View } from "react-native";

const CampGroupsContent = () => {
  const { groupsGrouped, isLoading, isError } = useAllGroupsGroupedBySession();

  if (!groupsGrouped || isLoading || isError) {
    return <Loading showText={false} />;
  }

  if (groupsGrouped.length === 0) {
    return <EmptyScreenMessage text="Neexistujú žiadne oddiely." />;
  }

  return (
    <View className="h-[87.5%] border-y border-outline-500">
      <ScrollView contentContainerClassName="items-center gap-5 py-5">
        {groupsGrouped.map((sessionGroups, index) => (
          <CampGroupsBox key={index} sessionGroups={sessionGroups} />
        ))}
      </ScrollView>
    </View>
  )
}

export default CampGroupsContent