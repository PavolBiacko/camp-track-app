import CampChildrenForm from '@/components/custom/camp/children/base/CampChildrenForm'
import CustomButton from '@/components/custom/CustomButton'
import CustomModal from '@/components/custom/CustomModal'
import Loading from '@/components/custom/Loading'
import { useChildById, useDeleteChild, useUpdateChild } from '@/hooks/models/useChildren'
import { mapDateTimeToString } from '@/mappers/datetime'
import { mapDbGenderToGender } from '@/mappers/gender'
import { CampChildParams } from '@/types/camp'
import { ChildUpdate } from '@/types/models/children'
import { campChildSchema } from '@/validation/camp'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { Alert, ScrollView } from 'react-native'

const UpdateChild = () => {
  const { childId } = useLocalSearchParams<CampChildParams>();

  const { updateChild } = useUpdateChild(childId);
  const { deleteChild } = useDeleteChild(childId);
  const { child, isLoading, isError } = useChildById(childId);

  const [modalVisible, setModalVisible] = useState(false);

  const handleUpdateChild = async (data: ChildUpdate) => {
    // Data are valid, checked with Zod
    try {
      await updateChild(data);
      Alert.alert("Hotovo!", "Dieťa bola úspešne upravené.");
      router.back();
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  const handleDeleteChild = async () => {
    // No need to check for validation, we are deleting the child
    try {
      await deleteChild();
      Alert.alert("Hotovo!", "Dieťa bola úspešne odstránené.");
      router.back();
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  if (!child || isLoading || isError) {
    return <Loading showText={true} />
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="px-4">
      <CampChildrenForm<ChildUpdate>
        title={"Dieťa"}
        fields={[
          { title: "Meno", formDataTypeKey: "firstName" },
          { title: "Priezvisko", formDataTypeKey: "lastName" },
          { title: "Dátum narodenia", formDataTypeKey: "birthDate" },
          { title: "Pohlavie", formDataTypeKey: "gender" },
        ]}
        initialValues={{
          firstName: child.firstName,
          lastName: child.lastName,
          birthDate: mapDateTimeToString(child.birthDate, "date"),
          gender: mapDbGenderToGender(child.gender),
        }}
        validationSchema={campChildSchema}
        onSubmit={handleUpdateChild}
        buttonText="Uprav dieťa"
      />
      {/* delete the child */}
      <CustomButton
        title="Vymaž dieťa"
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
        handleConfirm={handleDeleteChild}
        containerStyles='w-3/4'
      />
    </ScrollView>
  )
}

export default UpdateChild