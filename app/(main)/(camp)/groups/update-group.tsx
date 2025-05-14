import CampGroupsForm from '@/components/custom/camp/groups/base/CampGroupsForm';
import CustomButton from '@/components/custom/CustomButton';
import CustomModal from '@/components/custom/CustomModal';
import Loading from '@/components/custom/Loading';
import { useDeleteGroup, useGroupById, useUpdateGroup } from '@/hooks/models/useGroups';
import { mapGroupUpdateFormInputsToGroupUpdate } from '@/mappers/groups';
import { CampGroupParams } from '@/types/camp';
import { GroupUpdateFormInputs } from '@/types/models/groups';
import { campGroupSchema } from '@/validation/camp';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView } from 'react-native';

const UpdateGroup = () => {
  const params = useLocalSearchParams<CampGroupParams>();
  const groupId = parseInt(params.groupId);

  const { updateGroup } = useUpdateGroup(groupId);
  const { deleteGroup } = useDeleteGroup(groupId);
  const { group, isLoading, isError } = useGroupById(groupId);

  const [modalVisible, setModalVisible] = useState(false);

  const handleUpdateGroup = async (data: GroupUpdateFormInputs) => {
    // Data are valid, checked with Zod
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
      {/* delete the child */}
      <CustomButton
        title="Vymaž oddiel"
        action="error"
        handlePress={() => setModalVisible(true)}
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