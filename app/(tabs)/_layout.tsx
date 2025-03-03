import { Tabs } from 'expo-router';

import { icons } from "../../constants";

import { TabIcon } from '@/components/TabIcon';
import { useCapitalizeWord } from '@/hooks/useUtilHooks';

const tabData = [
  { name: 'home', icon: icons.home },
  { name: 'bookmark', icon: icons.bookmark },
  { name: 'create', icon: icons.plus },
  { name: 'profile', icon: icons.profile },
];

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{

        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarVariant: 'uikit',
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 60,
        },
      }}
    >
      {tabData.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            headerShown: false,
            animation: "shift",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={tab.icon}
                color={color}
                name={useCapitalizeWord(tab.name)}
                focused={focused}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  )
}

export default TabsLayout