import { useScheduleContext } from '@/components/custom/context/ScheduleContext'
import ScheduleForm from '@/components/custom/schedule/ScheduleForm'
import { useCreateActivity } from '@/hooks/models/useSchedule'
import { useAuth } from '@/hooks/useAuth'
import { mapDateTimeToString } from '@/mappers/datetime'
import { UserRoles } from '@/types/enums/roles'
import { ActivityCreate } from '@/types/models/activities'
import { scheduleSchema } from '@/validation/schedule'
import { router } from 'expo-router'
import { Alert } from 'react-native'

const CreateActivity = () => {
  const { createActivity } = useCreateActivity();
  const { selectedDate } = useScheduleContext();
  const { user } = useAuth();


  if (!user) {
    return null;  // should not happen, since useAuth is used in the layout layer
  }

  const handleAddActivity = async (data: ActivityCreate) => {
    // Data are valid, checked with Zod
    try {
      // There are only two roles that can create activity (CampLeader and GroupLeader)
      // - If user is CampLeader, set leaderId to null (so everyone can see that)
      // - If user is GroupLeader, set leaderId to user.id (so only they can see that)
      await createActivity({ ...data, leaderId: (user.role === UserRoles.GROUP_LEADER) ? user.id : null });
      router.back();
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  return (
    <ScheduleForm<ActivityCreate>
      title={"Pridaj aktivitu"}
      fields={[
        { title: "Názov", formDataTypeKey: "name" },
        { title: "Popis", formDataTypeKey: "description" },
        { title: "Čas", formDataTypeKey: "time" },
        { title: "Dátum", formDataTypeKey: "date" }
      ]}
      initialValues={{
        name: "",
        description: "",
        time: mapDateTimeToString(new Date(), "time")!,
        date: mapDateTimeToString(selectedDate, "date")
      }}
      validationSchema={scheduleSchema}
      onSubmit={handleAddActivity}
    />
  )
}

export default CreateActivity