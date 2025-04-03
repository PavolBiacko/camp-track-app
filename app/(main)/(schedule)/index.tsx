import ScheduleForm from '@/components/custom/schedule/ScheduleForm'
import { scheduleRepository } from '@/repositories/scheduleRepository'
import { AddActivity } from '@/types/models/activities'
import { ScheduleParams } from '@/types/schedule'
import { scheduleSchema } from '@/validation/schedule'
import { router, useLocalSearchParams } from 'expo-router'
import { Alert } from 'react-native'

const Activity = () => {
  const params = useLocalSearchParams<ScheduleParams>()

  const handleAddActivity = async (data: AddActivity) => {
    // Data are valid, checked with Zod
    try {
      await scheduleRepository.createActivity({ ...data });
      router.back();
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  return (
    <ScheduleForm
      title={params.mode === "add" ? "Pridaj aktivitu" : "Uprav aktivitu"}
      fields={[
        { title: "Názov", formDataTypeKey: "name" },
        { title: "Popis", formDataTypeKey: "description" },
        { title: "Čas", formDataTypeKey: "time" },
        { title: "Dátum", formDataTypeKey: "date" }
      ]}
      initialValues={{ name: "", description: "", time: "00:00", date: "01.01.2025" }}
      validationSchema={scheduleSchema}
      onSubmit={handleAddActivity}
    />
  )
}

export default Activity