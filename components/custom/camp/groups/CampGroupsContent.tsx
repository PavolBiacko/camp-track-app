import EmptyScreenMessage from "@/components/custom/EmptyScreenMessage";
import { Group } from "@/types/models/groups";
import { useState } from "react";
import { ScrollView, View } from "react-native";

const dummyData: Group[][] = [
  [
    {
      id: 1,
      number: 1,
      name: "Oddiel 1",
      sessionId: 11,
      leaderId: "uuid1",
      createdAt: new Date(),
    },
    {
      id: 2,
      number: 2,
      name: "Oddiel 2",
      sessionId: 11,
      leaderId: "uuid2",
      createdAt: new Date(),
    },
    {
      id: 3,
      number: 3,
      name: "Oddiel 3",
      sessionId: 11,
      leaderId: "uuid3",
      createdAt: new Date(),
    },
    {
      id: 4,
      number: 4,
      name: "Oddiel 4",
      sessionId: 11,
      leaderId: "uuid4",
      createdAt: new Date(),
    },
    {
      id: 5,
      number: 5,
      name: "Oddiel 5",
      sessionId: 11,
      leaderId: "uuid5",
      createdAt: new Date(),
    },
    {
      id: 6,
      number: 6,
      name: "Oddiel 6",
      sessionId: 11,
      leaderId: "uuid6",
      createdAt: new Date(),
    },
  ],
  [
    {
      id: 7,
      number: 1,
      name: "Oddiel 1",
      sessionId: 11,
      leaderId: "uuid7",
      createdAt: new Date(),
    },
    {
      id: 8,
      number: 2,
      name: "Oddiel 2",
      sessionId: 11,
      leaderId: "uuid8",
      createdAt: new Date(),
    },
    {
      id: 9,
      number: 3,
      name: "Oddiel 3",
      sessionId: 11,
      leaderId: "uuid9",
      createdAt: new Date(),
    },
    {
      id: 10,
      number: 4,
      name: "Oddiel 4",
      sessionId: 11,
      leaderId: "uuid10",
      createdAt: new Date(),
    },
    {
      id: 11,
      number: 5,
      name: "Oddiel 5",
      sessionId: 11,
      leaderId: "uuid11",
      createdAt: new Date(),
    },
    {
      id: 12,
      number: 6,
      name: "Oddiel 6",
      sessionId: 11,
      leaderId: "uuid12",
      createdAt: new Date(),
    },
  ],
]

const CampGroupsContent = () => {
  // Sample dummyData for demonstration (replace with actual data)
  const dummyData = [
    "Group 1", "Group 2", "Group 3", "Group 4", "Group 5", "Group 6",
    "Group 7", "Group 8", "Group 9", "Group 10", "Group 11", "Group 12",
    "Group 13", "Group 14", "Group 15", "Group 16", "Group 17", "Group 18",
  ];

  // State for controlling the CustomPicker visibility
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Handler for when an item is selected in the picker
  const handleSelect = (item: string) => {
    console.log("Selected item:", item);
  };

  if (dummyData.length === 0) {
    return <EmptyScreenMessage text="Neexistujú žiadne oddiely." />;
  }

  return (
    <View className="h-[87.5%] border-t border-outline-500">
      <ScrollView contentContainerClassName="items-center gap-5 py-5">

      </ScrollView>
    </View>
  )
}

export default CampGroupsContent