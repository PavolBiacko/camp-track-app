import CampSessionForm from '@/components/custom/camp/base/CampSessionForm';
import Loading from '@/components/custom/Loading';
import { useCampSession, useManyCampSessionsGrouped, useUpdateCampSession } from '@/hooks/models/useCampSessions';
import { mapDateTimeToString } from '@/mappers/datetime';
import { CampSessionParams } from '@/types/camp';
import { CampSessionUpdate } from '@/types/models/campSessions';
import { isCampSessionIntersecting } from '@/utils/camp';
import { campSessionSchema } from '@/validation/camp';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, ScrollView } from 'react-native';

const UpdateSession = () => {
  const params = useLocalSearchParams<CampSessionParams>();
  const campSessionId = parseInt(params.campSessionId);

  const { campSessionsGrouped } = useManyCampSessionsGrouped();
  const { campSession, isLoading, isError } = useCampSession(campSessionId);
  const { updateCampSession } = useUpdateCampSession(campSessionId);

  const allCampSessions = campSessionsGrouped?.flat()!;  // they are loaded one level above

  if (!campSession || isLoading || isError) {
    return <Loading showText={true} />
  }

  const handleUpdateCampSession = async (data: CampSessionUpdate) => {
    // Data are valid, checked with Zod, just needs to be validated for intersections
    try {
      if (isCampSessionIntersecting(allCampSessions, data, campSessionId)) {
        Alert.alert("Zamietnuté!", "Turnus sa prekrýva s iným turnusom.");
        return;
      }
      await updateCampSession({ ...data });
      Alert.alert("Hotovo!", "Turnus bol úspešne upravený.");
      router.back();
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="px-4">
      <CampSessionForm<CampSessionUpdate>
        title={"Turnus"}
        fields={[
          { title: "Začiatok", formDataTypeKey: "beginDate" },
          { title: "Koniec", formDataTypeKey: "endDate" },
        ]}
        initialValues={{
          beginDate: mapDateTimeToString(campSession.beginDate, "date")!,
          endDate: mapDateTimeToString(campSession.endDate, "date")!,
        }}
        validationSchema={campSessionSchema}
        onSubmit={handleUpdateCampSession}
        buttonText='Uprav turnus'
      />
    </ScrollView>
  )
}

export default UpdateSession