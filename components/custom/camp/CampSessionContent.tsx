import EmptyScreenMessage from "@/components/custom/EmptyScreenMessage";
import { ScrollView, View } from "react-native";
import CampSessionBox from "./base/CampSessionBox";

const dummyData = [
  [
    {
      id: 1,
      beginDate: new Date('2023-07-02'),
      endDate: new Date('2023-07-11'),
      createdAt: new Date(),
    },
    {
      id: 2,
      beginDate: new Date('2023-07-12'),
      endDate: new Date('2023-07-22'),
      createdAt: new Date(),
    },
    {
      id: 3,
      beginDate: new Date('2023-07-23'),
      endDate: new Date('2023-08-01'),
      createdAt: new Date(),
    },
  ],
  [
    {
      id: 4,
      beginDate: new Date('2024-07-05'),
      endDate: new Date('2024-07-14'),
      createdAt: new Date(),
    },
    {
      id: 5,
      beginDate: new Date('2024-07-15'),
      endDate: new Date('2024-07-24'),
      createdAt: new Date(),
    },
    {
      id: 6,
      beginDate: new Date('2024-07-25'),
      endDate: new Date('2024-08-03'),
      createdAt: new Date(),
    },
  ],
  [
    {
      id: 7,
      beginDate: new Date('2025-07-03'),
      endDate: new Date('2025-07-12'),
      createdAt: new Date(),
    },
    {
      id: 8,
      beginDate: new Date('2025-07-13'),
      endDate: new Date('2025-07-22'),
      createdAt: new Date(),
    },
    {
      id: 9,
      beginDate: new Date('2025-07-24'),
      endDate: new Date('2025-08-03'),
      createdAt: new Date(),
    },
  ],
];

const CampSessionContent = () => {

  if (dummyData.length === 0) {
    return <EmptyScreenMessage text='Neexistujú žiadne turnusy.' />;
  }

  return (
    <View className="h-[87.5%] border-t border-outline-500">
      <ScrollView contentContainerClassName="items-center gap-5 py-5">
        {dummyData.map((year, index) => (
          <CampSessionBox key={index} year={year} />
        ))}
      </ScrollView>
    </View>

  )
}

export default CampSessionContent