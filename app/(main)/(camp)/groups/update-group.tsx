import CampGroupsForm from '@/components/custom/camp/groups/base/CampGroupsForm';
import CustomButton from '@/components/custom/CustomButton';
import CustomModal from '@/components/custom/CustomModal';
import Loading from '@/components/custom/Loading';
import { useCreateManyGroupAccounts, useDeleteManyGroupAccounts, useManyAccountsWithGroup } from '@/hooks/models/useGroupAccounts';
import { useDeleteGroup, useGroupById, useUpdateGroup } from '@/hooks/models/useGroups';
import { mapGroupUpdateFormInputsToGroupUpdate } from '@/mappers/groups';
import { CampGroupParams } from '@/types/camp';
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

  const { group, isLoading: isLoadingGroup, isError: isErrorGroup } = useGroupById(groupId);
  const { children, isLoading: isLoadingAccounts, isError: isErrorAccounts } = useManyAccountsWithGroup(groupId);

  const [modalVisible, setModalVisible] = useState(false);

  if (!group || isLoadingGroup || isErrorGroup || !children || isLoadingAccounts || isErrorAccounts) {
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
      if (data.childrenIds.length > children.length) {
        const groupAccounts = getGroupAccountObjects(groupId, data.childrenIds);
        await createGroupAccounts(groupAccounts);
      } else if (data.childrenIds.length < children.length) {
        const accountsToDelete = children.filter((account) => !data.childrenIds.includes(account.childId));
        await deleteGroupAccounts(accountsToDelete.map((account) => account.childId));
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
      Alert.alert("Hotovo!", "Dieťa bola úspešne odstránené.");
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
      {/* delete the child */}
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