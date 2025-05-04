import CampSessionForm from '@/components/custom/camp/base/CampSessionForm';
import { useCreateCampSession, useManyCampSessionsGrouped } from '@/hooks/models/useCampSessions';
import { mapDateTimeToString } from '@/mappers/datetime';
import { CampSessionCreate } from '@/types/models/campSessions';
import { isCampSessionIntersecting } from '@/utils/camp';
import { campSessionSchema } from '@/validation/camp';
import { router } from 'expo-router';
import { Alert, ScrollView } from 'react-native';

const CreateSession = () => {
  const campSessionId = null;

  const { campSessionsGrouped } = useManyCampSessionsGrouped();
  const { createCampSession } = useCreateCampSession();

  const allCampSessions = campSessionsGrouped?.flat()!;  // they are loaded one level above

  const handleCreateCampSession = async (data: CampSessionCreate) => {
    // Data are valid, checked with Zod, just needs to be validated for intersections
    try {
      if (isCampSessionIntersecting(allCampSessions, data, campSessionId)) {
        Alert.alert("Zamietnuté!", "Turnus sa prekrýva s iným turnusom.");
        return;
      }
      await createCampSession({ ...data });
      Alert.alert("Hotovo!", "Turnus bol úspešne upravený.");
      router.back();
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="px-4">
      <CampSessionForm<CampSessionCreate>
        title={"Pridaj turnus"}
        fields={[
          { title: "Začiatok", formDataTypeKey: "beginDate" },
          { title: "Koniec", formDataTypeKey: "endDate" },
        ]}
        initialValues={{
          beginDate: mapDateTimeToString(new Date(), "date")!,
          endDate: mapDateTimeToString(new Date(), "date")!,
        }}
        validationSchema={campSessionSchema}
        onSubmit={handleCreateCampSession}
        buttonText='Pridaj turnus'
      />
    </ScrollView>
  )
}

export default CreateSession