import { TabIcon } from '@/components/TabIcon';
import { useCapitalizeWord } from '@/hooks/useUtilHooks';
import { TabData } from '@/types/tabs';
import { Tabs } from 'expo-router';
import { icons, options } from "../../constants";

const tabData: TabData[] = [
  { name: 'home', shownLabel: "Domov", icon: icons.home },
  { name: 'calendar', shownLabel: "Program", icon: icons.calendar },
  { name: 'finance', shownLabel: "Financie", icon: icons.accounts },
  { name: 'messages', shownLabel: "Správy", icon: icons.comment },
  { name: 'gallery', shownLabel: "Galéria", icon: icons.galery },
];

const TabsLayout = () => {
  return (
    <Tabs backBehavior='none' screenOptions={options.tabScreenOptions}>
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
                shownLabel={useCapitalizeWord(tab.shownLabel)}
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