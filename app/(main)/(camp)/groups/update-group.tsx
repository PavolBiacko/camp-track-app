import CampGroupsForm from '@/components/custom/camp/groups/base/CampGroupsForm';
import Loading from '@/components/custom/Loading';
import { useGroupById, useUpdateGroup } from '@/hooks/models/useGroups';
import { mapGroupUpdateFormInputsToGroupUpdate } from '@/mappers/groups';
import { CampGroupParams } from '@/types/camp';
import { GroupUpdateFormInputs } from '@/types/models/groups';
import { campGroupSchema } from '@/validation/camp';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, ScrollView } from 'react-native';

const UpdateGroup = () => {
  const params = useLocalSearchParams<CampGroupParams>();
  const groupId = parseInt(params.groupId);

  const { group, isLoading, isError } = useGroupById(groupId);
  const { updateGroup } = useUpdateGroup(groupId);

  const handleUpdateGroup = async (data: GroupUpdateFormInputs) => {
    // Data are valid, checked with Zod, just needs to be validated for intersections
    try {
      const groupData = mapGroupUpdateFormInputsToGroupUpdate(data);
      await updateGroup(groupData);
      Alert.alert("Hotovo!", "Oddiel bol úspešne upravený.");
      router.back();
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  if (!group || isLoading || isError) {
    return <Loading showText={true} />
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="px-4">
      <CampGroupsForm<GroupUpdateFormInputs>
        title={"Oddiel"}
        fields={[
          { title: "Číslo", formDataTypeKey: "number" },
          { title: "Názov", formDataTypeKey: "name" },
          { title: "Turnus", formDataTypeKey: "sessionId" },
          { title: "Vedúci", formDataTypeKey: "leaderId" },
        ]}
        initialValues={{
          number: String(group.number),
          name: group.name ?? "",
          sessionId: String(group.sessionId),
          leaderId: group.leaderId,
        }}
        validationSchema={campGroupSchema}
        onSubmit={handleUpdateGroup}
        buttonText="Uprav oddiel"
      />
    </ScrollView>
  )
}

export default UpdateGroup