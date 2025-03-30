import Loading from '@/components/custom/Loading';
import TabIcon from '@/components/custom/TabIcon';
import BaseLayout from '@/components/layouts/BaseLayout';
import { icons } from "@/constants";
import { useAuth } from '@/hooks/useAuth';
import { UserRoles } from '@/types/enums/roles';
import { TabData } from '@/types/tabs';
import { capitalizeWord, getTabScreenOptions } from '@/utils';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

const EVERYBODY = [UserRoles.CAMP_LEADER, UserRoles.GROUP_LEADER, UserRoles.PARENT, UserRoles.USER];

const tabData: TabData[] = [
  { name: 'index', shownLabel: 'Domov', icon: icons.home, roles: EVERYBODY },
  { name: 'schedule', shownLabel: 'Program', icon: icons.calendar, roles: EVERYBODY },
  { name: 'finance', shownLabel: 'Financie', icon: icons.accounts, roles: [UserRoles.GROUP_LEADER] },
  { name: 'groups', shownLabel: 'Oddiely', icon: icons.group, roles: [UserRoles.CAMP_LEADER] },
  { name: 'children', shownLabel: 'Moje deti', icon: icons.children, roles: [UserRoles.PARENT] },
  { name: 'messages', shownLabel: 'Správy', icon: icons.message, roles: EVERYBODY },
  { name: 'gallery', shownLabel: 'Galéria', icon: icons.gallery, roles: EVERYBODY },
];

const TabsLayout = () => {
  const { colorScheme } = useColorScheme();

  const { user, isLoading, isError } = useAuth();

  if (!user || isLoading || isError) {
    return <Loading showText={true} />;
  }

  return (
    <View className='h-full'>
      <BaseLayout />
      <Tabs backBehavior='none' screenOptions={getTabScreenOptions(colorScheme)}>
        {tabData.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              headerShown: false,
              animation: 'shift',
              href: tab.roles.includes(user.role) ? undefined : null,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={tab.icon}
                  color={color}
                  shownLabel={capitalizeWord(tab.shownLabel)}
                  focused={focused}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </View>
  )
}

export default TabsLayout
