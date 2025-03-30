import Loading from '@/components/custom/Loading'
import ScheduleLine from '@/components/custom/schedule/base/ScheduleLine'
import { useAllActivities } from '@/hooks/models/useSchedule'
import { useCurrentTime } from '@/hooks/useCurrentTime'
import { getActiveActivityIndex, getActivityStatus } from '@/utils'
import { ScrollView } from 'react-native'
import { useScheduleContext } from '../context/ScheduleContext'

const ScheduleContent = () => {
  const currentTime = useCurrentTime();
  const { selectedDate, setSelectedDate } = useScheduleContext();
  const { activities, isLoading, isError } = useAllActivities();

  console.log(selectedDate)

  if (!activities || isLoading || isError) {
    return <Loading showText={false} />
  }

  const activeIndex = getActiveActivityIndex(activities, currentTime);

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 10 }} className='w-full h-full'>
      {activities.map((activity, index) => (
        <ScheduleLine
          key={index}
          title={activity.name}
          time={activity.time}
          status={getActivityStatus(index, activeIndex)}
          isCustom={activity.leaderId !== null}
        />
      ))}
    </ScrollView>
  )
}

export default ScheduleContent