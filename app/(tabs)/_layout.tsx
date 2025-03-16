import TabIcon from '@/components/TabIcon';
import { icons, options } from "@/constants";
import { useCapitalizeWord } from '@/hooks/useUtilHooks';
import { UserRoles } from '@/types/roles';
import { TabData } from '@/types/tabs';
import { Tabs } from 'expo-router';

const EVERYBODY = [UserRoles.CAMP_LEADER, UserRoles.GROUP_LEADER, UserRoles.PARENT, UserRoles.USER];

const tabData: TabData[] = [
  { name: 'home', shownLabel: 'Domov', icon: icons.home, roles: EVERYBODY },
  { name: 'calendar', shownLabel: 'Program', icon: icons.calendar, roles: EVERYBODY },
  { name: 'finance', shownLabel: 'Financie', icon: icons.accounts, roles: [UserRoles.GROUP_LEADER] },
  { name: 'groups', shownLabel: 'Oddiely', icon: icons.group, roles: [UserRoles.CAMP_LEADER] },
  { name: 'children', shownLabel: 'Moje deti', icon: icons.children, roles: [UserRoles.PARENT] },
  { name: 'messages', shownLabel: 'Správy', icon: icons.comment, roles: EVERYBODY },
  { name: 'gallery', shownLabel: 'Galéria', icon: icons.gallery, roles: EVERYBODY },
];

const CURRENT_USER_ROLE = UserRoles.PARENT;

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
            href: tab.roles.includes(CURRENT_USER_ROLE) ? undefined : null,
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