import CampChildrenForm from '@/components/custom/camp/children/base/CampChildrenForm';
import { useCreateChild } from '@/hooks/models/useChildren';
import { Gender } from '@/types/enums/gender';
import { ChildCreate } from '@/types/models/children';
import { campChildSchema } from '@/validation/camp';
import { router } from 'expo-router';
import { Alert, ScrollView } from 'react-native';

const CreateChild = () => {
  const { createChild } = useCreateChild();

  const handleCreateChild = async (data: ChildCreate) => {
    // Data are valid, checked with Zod
    try {
      await createChild(data);
      Alert.alert("Hotovo!", "Dieťa bolo úspešne vytvorené.");
      router.back();
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="px-4">
      <CampChildrenForm<ChildCreate>
        title={"Pridaj dieťa"}
        fields={[
          { title: "Meno", formDataTypeKey: "firstName" },
          { title: "Priezvisko", formDataTypeKey: "lastName" },
          { title: "Dátum narodenia", formDataTypeKey: "birthDate" },
          { title: "Pohlavie", formDataTypeKey: "gender" },
        ]}
        initialValues={{
          firstName: "",
          lastName: "",
          birthDate: null,
          gender: Gender.MALE,
        }}
        validationSchema={campChildSchema}
        onSubmit={handleCreateChild}
      />
    </ScrollView>
  )
}

export default CreateChild