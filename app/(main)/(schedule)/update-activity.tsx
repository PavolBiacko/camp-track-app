import CustomButton from '@/components/custom/CustomButton'
import Loading from '@/components/custom/Loading'
import ScheduleForm from '@/components/custom/schedule/ScheduleForm'
import { useActivity, useDeleteActivity, useUpdateActivity } from '@/hooks/models/useActivities'
import { mapDateTimeToString } from '@/mappers/datetime'
import { ActivityUpdate } from '@/types/models/activities'
import { ScheduleParams } from '@/types/schedule'
import { scheduleSchema } from '@/validation/schedule'
import { router, useLocalSearchParams } from 'expo-router'
import { Alert, ScrollView } from 'react-native'

const UpdateActivity = () => {
  const params = useLocalSearchParams<ScheduleParams>();
  const activityId = parseInt(params.activityId);

  const { updateActivity } = useUpdateActivity(activityId);
  const { deleteActivity, isPending } = useDeleteActivity(activityId);
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

  const handleDeleteActivity = async () => {
    // No need to check for validation, we are deleting the activity
    try {
      await deleteActivity();
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
    <ScrollView keyboardShouldPersistTaps="handled" className="px-4">
      <ScheduleForm<ActivityUpdate>
        title={"Aktivita"}
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
        buttonText='Uprav aktivitu'
      />
      {/* delete the activity */}
      <CustomButton
        title="Vymaž aktivitu"
        action="error"
        handlePress={handleDeleteActivity}
        containerStyles="my-5 h-[4.5rem] rounded-3xl"
        isLoading={isPending}
      />
    </ScrollView>
  )
}

export default UpdateActivity