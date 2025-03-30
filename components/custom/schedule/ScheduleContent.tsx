import Loading from '@/components/custom/Loading'
import ScheduleLine from '@/components/custom/schedule/base/ScheduleLine'
import { useAllActivities } from '@/hooks/models/useSchedule'
import { useCurrentTime } from '@/hooks/useCurrentTime'
import { getActiveActivityIndex, getActivityStatus } from '@/utils'
import { ScrollView } from 'react-native'

const dummySchedule = [
  {
    id: 1,
    title: 'Meeting with John',
    time: '10:00 AM',
    date: '2023-10-01',
  },
]

const ScheduleContent = () => {
  const { activities, isLoading, isError } = useAllActivities();
  const currentTime = useCurrentTime();

  if (!activities || isLoading || isError) {
    return <Loading showText={false} />
  }

  const activeIndex = getActiveActivityIndex(activities, currentTime);

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 10 }} className='w-full h-full'>
      {activities.map((schedule, index) => (
        <ScheduleLine
          key={index}
          title={schedule.name}
          time={schedule.time}
          status={getActivityStatus(index, activeIndex)}
        />
      ))}
    </ScrollView>
  )
}

export default ScheduleContent