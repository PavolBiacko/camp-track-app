import CampGroupsForm from '@/components/custom/camp/groups/base/CampGroupsForm';
import CustomButton from '@/components/custom/CustomButton';
import CustomModal from '@/components/custom/CustomModal';
import Loading from '@/components/custom/Loading';
import { useCreateManyGroupAccounts, useDeleteManyGroupAccounts, useManyAccountsWithGroup } from '@/hooks/models/useGroupAccounts';
import { useAllGroups, useDeleteGroup, useGroupById, useUpdateGroup } from '@/hooks/models/useGroups';
import { useChangeUserRole } from '@/hooks/models/useUsers';
import { mapGroupUpdateFormInputsToGroupUpdate } from '@/mappers/groups';
import { CampGroupParams } from '@/types/camp';
import { UserRoles } from '@/types/enums/roles';
import { GroupUpdateFormInputs } from '@/types/models/groups';
import { getGroupAccountObjects } from '@/utils/camp';
import { campGroupSchema } from '@/validation/camp';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView } from 'react-native';

const UpdateGroup = () => {
  const params = useLocalSearchParams<CampGroupParams>();
  const groupId = parseInt(params.groupId);

  const { updateGroup } = useUpdateGroup(groupId);
  const { deleteGroup } = useDeleteGroup(groupId);
  const { deleteGroupAccounts } = useDeleteManyGroupAccounts(groupId);
  const { createGroupAccounts } = useCreateManyGroupAccounts();
  const { changeUserRole } = useChangeUserRole();

  const { group, isLoading: isLoadingGroup, isError: isErrorGroup } = useGroupById(groupId);
  const { groups, isLoading: isLoadingGroups, isError: isErrorGroups } = useAllGroups();
  const { children, isLoading: isLoadingAccounts, isError: isErrorAccounts } = useManyAccountsWithGroup(groupId);

  const [modalVisible, setModalVisible] = useState(false);

  if (
    !group || isLoadingGroup || isErrorGroup ||
    !children || isLoadingAccounts || isErrorAccounts ||
    !groups || isLoadingGroups || isErrorGroups
  ) {
    return <Loading showText={true} />
  }

  const handleUpdateGroup = async (data: GroupUpdateFormInputs) => {
    // Data are valid, checked with Zod
    try {
      const groupData = mapGroupUpdateFormInputsToGroupUpdate(data);
      await updateGroup(groupData);

      // Check if the number of children is the same
      // - If the number of children is the same, we can just update the group accounts (do nothing else)
      // - If the number of children is different, we need to create or delete group accounts
      if (data.childrenIds.length != children.length) {
        const childrenIdsToAdd = data.childrenIds.filter((childId) => !children.some((account) => account.childId === childId));
        const accountsToDelete = children.filter((account) => !data.childrenIds.includes(account.childId));
        const groupAccounts = getGroupAccountObjects(groupId, childrenIdsToAdd);

        await createGroupAccounts(groupAccounts);
        await deleteGroupAccounts(accountsToDelete.map((account) => account.childId));
      }

      if (data.leaderId !== group.leaderId) {
        // Degradácia starého lídra, ak je to potrebné
        const groupLeadersPrevious = groups.filter((gr) => gr.leaderId === group.leaderId);
        const groupLeadersNext = groups.filter((gr) => gr.leaderId === data.leaderId);

        if (group.leaderId !== null && groupLeadersPrevious.length === 1) {
          await changeUserRole({ id: group.leaderId, role: UserRoles.USER });
        }

        // Povýšenie nového lídra, ak je to potrebné
        if (data.leaderId !== null && groupLeadersNext.length === 0) {
          await changeUserRole({ id: data.leaderId!, role: UserRoles.GROUP_LEADER });
        }
      }

      Alert.alert("Hotovo!", "Oddiel bol úspešne upravený.");
      router.back();
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  const handleDeleteGroup = async () => {
    // No need to check for validation, we are deleting the group
    try {
      await deleteGroup();
      Alert.alert("Hotovo!", "Oddiel bol úspešne odstránený.");
      router.back();
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="px-4">
      <CampGroupsForm<GroupUpdateFormInputs>
        title={"Oddiel"}
        fields={[
          { title: "Číslo", formDataTypeKey: "number" },
          { title: "Názov", formDataTypeKey: "name" },
          { title: "Turnus", formDataTypeKey: "sessionId" },
          { title: "Vedúci", formDataTypeKey: "leaderId" },
          { title: "Deti", formDataTypeKey: "childrenIds" },
        ]}
        initialValues={{
          number: String(group.number),
          name: group.name ?? "",
          sessionId: String(group.sessionId),
          leaderId: group.leaderId,
          childrenIds: children.map((child) => child.childId),
        }}
        validationSchema={campGroupSchema}
        onSubmit={handleUpdateGroup}
        buttonText="Uprav oddiel"
      />
      {/* delete the group */}
      <CustomButton
        title="Vymaž oddiel"
        action="error"
        handlePress={() => setModalVisible(true)}
        textStyles='text-2xl'
        containerStyles="my-5 h-[4.5rem] rounded-3xl"
      />
      <CustomModal
        title="Naozaj chceš vykonať akciu?"
        type="confirmation"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleConfirm={handleDeleteGroup}
        containerStyles='w-3/4'
      />
    </ScrollView>
  )
}

export default UpdateGroup