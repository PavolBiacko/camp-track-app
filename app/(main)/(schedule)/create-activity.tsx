import { useScheduleContext } from '@/components/custom/context/ScheduleContext'
import ScheduleForm from '@/components/custom/schedule/ScheduleForm'
import { useCreateActivity } from '@/hooks/models/useSchedule'
import { mapDateTimeToString } from '@/mappers/datetime'
import { ActivityCreate } from '@/types/models/activities'
import { scheduleSchema } from '@/validation/schedule'
import { router } from 'expo-router'
import { Alert } from 'react-native'

const CreateActivity = () => {
  const { createActivity } = useCreateActivity();

  const { selectedDate } = useScheduleContext();

  const handleAddActivity = async (data: ActivityCreate) => {
    // Data are valid, checked with Zod
    try {
      await createActivity({ ...data });
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
        time: mapDateTimeToString(new Date(), "time"),
        date: mapDateTimeToString(selectedDate, "date")
      }}
      validationSchema={scheduleSchema}
      onSubmit={handleAddActivity}
    />
  )
}

export default CreateActivity