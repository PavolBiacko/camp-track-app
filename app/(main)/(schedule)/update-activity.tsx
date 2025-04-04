import Loading from '@/components/custom/Loading'
import ScheduleForm from '@/components/custom/schedule/ScheduleForm'
import { useActivity, useUpdateActivity } from '@/hooks/models/useSchedule'
import { mapDateTimeToString } from '@/mappers/datetime'
import { ActivityUpdate } from '@/types/models/activities'
import { ScheduleParams } from '@/types/schedule'
import { scheduleSchema } from '@/validation/schedule'
import { router, useLocalSearchParams } from 'expo-router'
import { Alert } from 'react-native'

const UpdateActivity = () => {
  const params = useLocalSearchParams<ScheduleParams>();
  const activityId = parseInt(params.activityId);

  const { updateActivity } = useUpdateActivity(activityId);
  const { activity, isLoading, isError } = useActivity(activityId);

  const handleUpdateActivity = async (data: ActivityUpdate) => {
    // Data are valid, checked with Zod
    try {
      await updateActivity({ ...data });
      router.back();
    } catch (error: any) {
      Alert.alert("Pozor!", error.message);
      return;
    }
  };

  if (!activity || isLoading || isError) {
    return <Loading showText={true} />
  }

  return (
    <ScheduleForm<ActivityUpdate>
      title={"Uprav aktivitu"}
      fields={[
        { title: "Názov", formDataTypeKey: "name" },
        { title: "Popis", formDataTypeKey: "description" },
        { title: "Čas", formDataTypeKey: "time" },
        { title: "Dátum", formDataTypeKey: "date" }
      ]}
      initialValues={{
        name: activity.name,
        description: activity.description || "",
        time: activity.time.hours + ":" + activity.time.minutes,
        date: mapDateTimeToString(activity.date, "date")
      }}
      validationSchema={scheduleSchema}
      onSubmit={handleUpdateActivity}
    />
  )
}

export default UpdateActivity