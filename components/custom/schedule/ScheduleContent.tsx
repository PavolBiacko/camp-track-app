import { useScheduleContext } from '@/components/custom/context/ScheduleContext'
import Loading from '@/components/custom/Loading'
import ScheduleLine from '@/components/custom/schedule/base/ScheduleLine'
import { useActivitiesByDay } from '@/hooks/models/useActivities'
import { useCurrentTime } from '@/hooks/useCurrentTime'
import { getActiveActivityIndex, getActivityStatus } from '@/utils/schedule'
import { ScrollView } from 'react-native'
import EmptyScreenMessage from '../EmptyScreenMessage'

const ScheduleContent = () => {
  const currentTime = useCurrentTime();
  const { selectedDate } = useScheduleContext();
  const { activities, isLoading, isError } = useActivitiesByDay(selectedDate);

  if (!activities || isLoading || isError) {
    return <Loading showText={false} />
  }

  if (activities.length === 0) {
    return <EmptyScreenMessage text="Vo vybraný deň neexistujú žiadne aktivity." />
  }

  const activeIndex = getActiveActivityIndex(activities, currentTime);

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 10 }} className='w-full h-full'>
      {activities.map((activity, index) => (
        <ScheduleLine
          key={index}
          activity={activity}
          status={getActivityStatus(index, activeIndex, selectedDate)}
          isCustom={activity.leaderId !== null}
        />
      ))}
    </ScrollView>
  )
}

export default ScheduleContent