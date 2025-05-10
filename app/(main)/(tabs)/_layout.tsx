import Loading from '@/components/custom/Loading';
import TabIcon from '@/components/custom/TabIcon';
import { icons } from "@/constants";
import { useAuth } from '@/hooks/useAuth';
import { UserRoles } from '@/types/enums/roles';
import { TabConfigs } from '@/types/tabs';
import { capitalizeWord } from '@/utils/strings';
import { getTabScreenOptions } from '@/utils/ui';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

const EVERYBODY = [UserRoles.CAMP_LEADER, UserRoles.GROUP_LEADER, UserRoles.PARENT, UserRoles.USER];

const tabConfigs: TabConfigs[] = [
  { name: 'index', shownLabel: 'Domov', icon: icons.home, roles: EVERYBODY },
  { name: 'schedule', shownLabel: 'Program', icon: icons.calendar, roles: EVERYBODY },
  { name: 'finance', shownLabel: 'Financie', icon: icons.accounts, roles: [UserRoles.GROUP_LEADER] },
  { name: 'camp', shownLabel: 'Tábor', icon: icons.connections, roles: [UserRoles.CAMP_LEADER] },
  { name: 'children', shownLabel: 'Moje deti', icon: icons.children, roles: [UserRoles.PARENT] },
  { name: 'messages', shownLabel: 'Správy', icon: icons.message, roles: [UserRoles.CAMP_LEADER, UserRoles.GROUP_LEADER] },
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
      <Tabs backBehavior='none' screenOptions={getTabScreenOptions(colorScheme)}>
        {tabConfigs.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              headerShown: false,
              animation: 'shift',
              lazy: false,
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
