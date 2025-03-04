import { TabIcon } from '@/components/TabIcon';
import { useCapitalizeWord } from '@/hooks/useUtilHooks';
import { TabData } from '@/types/tabs';
import { Tabs } from 'expo-router';
import { icons, styles } from "../../constants";

const tabData: TabData[] = [
  { name: 'home', icon: icons.home },
  { name: 'bookmark', icon: icons.bookmark },
  { name: 'create', icon: icons.plus },
  { name: 'profile', icon: icons.profile },
  { name: 'email', icon: icons.email },
];

const TabsLayout = () => {
  return (
    <Tabs screenOptions={styles.tabScreenOptions}>
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