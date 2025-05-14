import CampGroupsForm from '@/components/custom/camp/groups/base/CampGroupsForm';
import { useCreateGroup } from '@/hooks/models/useGroups';
import { mapGroupCreateFormInputsToGroupCreate } from '@/mappers/groups';
import { GroupCreateFormInputs } from '@/types/models/groups';
import { campGroupSchema } from '@/validation/camp';
import { router } from 'expo-router';
import { Alert, ScrollView } from 'react-native';

const CreateGroup = () => {
  const { createGroup } = useCreateGroup();

  const handleCreateGroup = async (data: GroupCreateFormInputs) => {
    // Data are valid, checked with Zod, just needs to be validated for intersections
    try {
      const groupData = mapGroupCreateFormInputsToGroupCreate(data);
      await createGroup(groupData);
      Alert.alert("Hotovo!", "Oddiel bol úspešne vytvorený.");
      router.back();
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="px-4">
      <CampGroupsForm<GroupCreateFormInputs>
        title={"Pridaj oddiel"}
        fields={[
          { title: "Číslo", formDataTypeKey: "number" },
          { title: "Názov", formDataTypeKey: "name" },
          { title: "Turnus", formDataTypeKey: "sessionId" },
          { title: "Vedúci", formDataTypeKey: "leaderId" },
          { title: "Deti", formDataTypeKey: "childrenIds" },
        ]}
        initialValues={{
          number: "",
          name: "",
          sessionId: null,
          leaderId: null,
          childrenIds: [],
        }}
        validationSchema={campGroupSchema}
        onSubmit={handleCreateGroup}
      />
    </ScrollView>
  )
}

export default CreateGroup