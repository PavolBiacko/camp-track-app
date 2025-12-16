import CampGroupsForm from '@/components/custom/camp/groups/base/CampGroupsForm';
import { useCreateCashRegister } from '@/hooks/models/useCashRegister';
import { useCreateManyGroupAccounts } from '@/hooks/models/useGroupAccounts';
import { useCreateGroup } from '@/hooks/models/useGroups';
import { useChangeUserRole } from '@/hooks/models/useUsers';
import { mapGroupCreateFormInputsToGroupCreate } from '@/mappers/groups';
import { UserRoles } from '@/types/enums/roles';
import { GroupCreateFormInputs } from '@/types/models/groups';
import { getGroupAccountObjects } from '@/utils/camp';
import { campGroupSchema } from '@/validation/camp';
import { router } from 'expo-router';
import { Alert, ScrollView } from 'react-native';

const CreateGroup = () => {
  const { createGroup } = useCreateGroup();
  const { createGroupAccounts } = useCreateManyGroupAccounts();
  const { createEmptyCashRegisterByGroup } = useCreateCashRegister();
  const { changeUserRole } = useChangeUserRole();

  const handleCreateGroup = async (data: GroupCreateFormInputs) => {
    // Data are valid, checked with Zod, just needs to be validated for intersections
    try {
      const groupData = mapGroupCreateFormInputsToGroupCreate(data);
      const { id, leaderId } = await createGroup(groupData);
      if (!id) throw new Error("Niečo sa pokazilo pri vytváraní oddielu.");

      const groupAccounts = getGroupAccountObjects(id, data.childrenIds);

      await createGroupAccounts(groupAccounts);
      await createEmptyCashRegisterByGroup(id);
      await changeUserRole({ id: leaderId, role: UserRoles.GROUP_LEADER });

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