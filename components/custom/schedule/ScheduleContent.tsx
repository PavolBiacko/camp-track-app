import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const dummySchedule = [
  {
    id: 1,
    title: 'Meeting with John',
    time: '10:00 AM',
    date: '2023-10-01',
  },
  {
    id: 2,
    title: 'Lunch with Sarah',
    time: '12:30 PM',
    date: '2023-10-02',
  },
  {
    id: 3,
    title: 'Project deadline',
    time: '5:00 PM',
    date: '2023-10-03',
  },
  {
    id: 4,
    title: 'Doctor appointment',
    time: '2:00 PM',
    date: '2023-10-04',
  },
  {
    id: 5,
    title: 'Dinner with family',
    time: '7:00 PM',
    date: '2023-10-05',
  },
  {
    id: 6,
    title: 'Grocery shopping',
    time: '4:00 PM',
    date: '2023-10-06',
  },
  {
    id: 7,
    title: 'Gym session',
    time: '6:30 PM',
    date: '2023-10-07',
  },
  {
    id: 8,
    title: 'Movie night',
    time: '8:00 PM',
    date: '2023-10-08',
  },
  {
    id: 9,
    title: 'Conference call',
    time: '11:00 AM',
    date: '2023-10-09',
  },
  {
    id: 10,
    title: 'Team meeting',
    time: '3:00 PM',
    date: '2023-10-10',
  },
  {
    id: 11,
    title: 'Workshop',
    time: '9:00 AM',
    date: '2023-10-11',
  },
  {
    id: 12,
    title: 'Family gathering',
    time: '5:30 PM',
    date: '2023-10-12',
  },
  {
    id: 13,
    title: 'Book club meeting',
    time: '7:00 PM',
    date: '2023-10-13',
  },
  {
    id: 14,
    title: 'Volunteer event',
    time: '10:00 AM',
    date: '2023-10-14',
  },
]

const ScheduleContent = () => {
  return (
    <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} className='w-full h-full'>
      {dummySchedule.map((schedule) => (
        <View key={schedule.id} className="flex-row justify-between bg-secondary-300 border-2 border-secondary-700 rounded-2xl px-3 my-2 w-11/12">
          <Text className="text-lg font-pbold mt-1">{schedule.title}</Text>
          <Text className="text-typography-950 font-psemibold mt-1">{schedule.time}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

export default ScheduleContent