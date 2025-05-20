import { useScheduleContext } from "@/components/custom/context/ScheduleContext";
import Loading from "@/components/custom/Loading";
import BaseLayout from "@/components/layouts/BaseLayout";
import { useActivitiesByDay } from "@/hooks/models/useActivities";
import { useCurrentCampSession } from "@/hooks/models/useCampSessions";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { formatISOLocalToHumanReadable } from "@/utils/dates";
import { getActiveActivityIndex } from "@/utils/schedule";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const currentTime = useCurrentTime();
  const { selectedDate } = useScheduleContext();
  const { activities, isLoading: isLoadingActivities, isError: isErrorActivities } = useActivitiesByDay(selectedDate);
  const { currentCampSession, isLoading: isLoadingSession, isError: isErrorSession } = useCurrentCampSession();

  if (
    !activities || isLoadingActivities || isErrorActivities ||
    !currentCampSession || isLoadingSession || isErrorSession
  ) {
    return <Loading showText={false} />
  }

  const activeIndex = getActiveActivityIndex(activities, currentTime);
  const beginDate = formatISOLocalToHumanReadable(currentCampSession.beginDate);
  const endDate = formatISOLocalToHumanReadable(currentCampSession.endDate);

  return (
    <BaseLayout>
      <View className='w-full flex-1 items-center justify-center gap-16'>
        <View className="w-full h-[20%] p-5">
          <Text className="text-typography-950 text-xl text-center font-pblack">
            Aktuálne prebiehajúci turnus
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => { }}
            className="rounded-3xl justify-center items-center bg-tertiary-300 h-full border-2 border-tertiary-700">
            <Text className="text-typography-950 text-2xl text-center font-pbold mt-1">
              {beginDate} - {endDate}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full h-[30%] p-5">
          <Text className="text-typography-950 text-xl text-center font-pblack">
            Aktuálne prebiehajúca aktivita
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => router.push("/(main)/(tabs)/schedule")}
            className="rounded-3xl justify-center items-center bg-secondary-300 h-full border-2 border-secondary-700">
            <Text className="text-typography-950 text-3xl text-center font-pbold mt-2">
              {activities[activeIndex].name} (od {activities[activeIndex].time.hours}:{activities[activeIndex].time.minutes})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseLayout>
  );
}

export default Home