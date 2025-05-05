import CampChildrenForm from '@/components/custom/camp/children/base/CampChildrenForm';
import { Gender } from '@/types/enums/gender';
import { ChildCreate } from '@/types/models/children';
import { campChildSchema } from '@/validation/camp';
import { router } from 'expo-router';
import { Alert, ScrollView } from 'react-native';

const CreateChild = () => {

  const handleCreateChild = async (data: ChildCreate) => {
    // Data are valid, checked with Zod
    try {
      console.log("data", JSON.stringify(data, null, 2));
      // await createCampSession({ ...data });
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