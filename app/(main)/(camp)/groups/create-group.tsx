import CampGroupsForm from '@/components/custom/camp/groups/base/CampGroupsForm';
import { GroupCreateFormInputs } from '@/types/models/groups';
import { campGroupSchema } from '@/validation/camp';
import { Alert, ScrollView } from 'react-native';

const CreateGroup = () => {

  const handleCreateGroup = async (data: GroupCreateFormInputs) => {
    // Data are valid, checked with Zod, just needs to be validated for intersections
    try {
      console.log("Creating group with data: ", data);
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
        ]}
        initialValues={{
          number: "",
          name: "",
          sessionId: "",
          leaderId: "",
        }}
        validationSchema={campGroupSchema}
        onSubmit={handleCreateGroup}
      />
    </ScrollView>
  )
}

export default CreateGroup