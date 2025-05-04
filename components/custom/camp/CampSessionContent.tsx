import CampSessionLine from "@/components/custom/camp/base/CampSessionLine";
import EmptyScreenMessage from "@/components/custom/EmptyScreenMessage";
import { ScrollView } from "react-native";

const dummyData = [
  {
    id: 1,
    beginDate: '2023-07-02',
    endDate: '2023-07-11',
    createdAt: new Date(),
  },
  {
    id: 2,
    beginDate: '2023-07-12',
    endDate: '2023-07-22',
    createdAt: new Date(),
  },
  {
    id: 3,
    beginDate: '2023-07-23',
    endDate: '2023-08-01',
    createdAt: new Date(),
  },
  {
    id: 4,
    beginDate: '2024-07-05',
    endDate: '2024-07-14',
    createdAt: new Date(),
  },
  {
    id: 5,
    beginDate: '2024-07-15',
    endDate: '2024-07-24',
    createdAt: new Date(),
  },
  {
    id: 6,
    beginDate: '2024-07-25',
    endDate: '2024-08-03',
    createdAt: new Date(),
  },
  {
    id: 7,
    beginDate: '2025-07-03',
    endDate: '2025-07-12',
    createdAt: new Date(),
  },
  {
    id: 8,
    beginDate: '2025-07-13',
    endDate: '2025-07-22',
    createdAt: new Date(),
  },
  {
    id: 9,
    beginDate: '2025-07-24',
    endDate: '2025-08-03',
    createdAt: new Date(),
  },
];

const CampSessionContent = () => {

  if (dummyData.length === 0) {
    return <EmptyScreenMessage text='V danom období nie sú zaznamenané žiadne pohyby.' />;
  }

  return (
    <ScrollView contentContainerClassName="items-center gap-5 py-5">
      {dummyData.map((session, index) => (
        <CampSessionLine
          key={index}
          beginDate={session.beginDate}
          endDate={session.endDate}
        />
      ))}
    </ScrollView>
  )
}

export default CampSessionContent