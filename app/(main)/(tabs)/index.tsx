import { useScheduleContext } from "@/components/custom/context/ScheduleContext";
import HelloWave from "@/components/custom/HelloWave";
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
    currentCampSession === undefined || isLoadingSession || isErrorSession
  ) {
    return <Loading showText={false} />;
  }

  const activeIndex = getActiveActivityIndex(activities, currentTime);

  let currentCampSessionDateRange = "Neprebieha žiadny turnus";
  if (currentCampSession) {
    const beginDate = formatISOLocalToHumanReadable(currentCampSession.beginDate);
    const endDate = formatISOLocalToHumanReadable(currentCampSession.endDate);
    currentCampSessionDateRange = `${beginDate} - ${endDate}`;
  }

  return (
    <BaseLayout>
      <View className="flex-1 w-full px-7 py-10">
        <View className="h-[40%] items-center justify-center border-2 border-primary-500 rounded-3xl">
          <View className="flex-row gap-2">
            <Text className="text-typography-950 text-6xl text-center font-pblack pt-3">
              Ahoj!
            </Text>
            <HelloWave />
          </View>
          <Text className="text-typography-950 text-4xl text-center font-pblack pt-3">
            Vitaj späť!
          </Text>
        </View>
        <View className="h-[60%] items-center justify-center gap-5">
          <View className="w-full h-[40%]">
            <Text className="text-typography-950 text-xl text-center font-pblack">
              Aktuálne prebiehajúci turnus
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => { }}
              className="rounded-3xl justify-center items-center bg-tertiary-300 h-[80%] border-2 border-tertiary-700 mt-2"
            >
              <Text className="text-typography-950 text-2xl text-center font-pbold pt-1">
                {currentCampSessionDateRange}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-full h-[40%]">
            <Text className="text-typography-950 text-xl text-center font-pblack">
              Aktuálne prebiehajúca aktivita
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => router.push("/(main)/(tabs)/schedule")}
              className="rounded-3xl justify-center items-center bg-secondary-300 h-[80%] border-2 border-secondary-700 mt-2"
            >
              <Text className="text-typography-950 text-3xl text-center font-pbold pt-2">
                {activeIndex !== -1
                  ? `${activities[activeIndex].name} (od ${activities[activeIndex].time.hours}:${activities[activeIndex].time.minutes})`
                  : "Zatiaľ žiadna"
                }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BaseLayout>
  );
};

export default Home;