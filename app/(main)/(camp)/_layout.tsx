import { ScreenConfigs } from '@/types/base';
import { getStackScreenOptions } from '@/utils/ui';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

const campScreenConfigs: ScreenConfigs[] = [
  { name: 'sessions/index', title: 'Turnusy' },
  { name: 'sessions/update-session', title: 'Editačný formulár' },
  { name: 'sessions/create-session', title: 'Vytvárací formulár' },
  { name: 'children', title: 'Deti' },
  { name: 'groups', title: 'Oddiely' },
];

const CampLayout = () => {
  const { colorScheme } = useColorScheme()

  return (
    <Stack screenOptions={getStackScreenOptions(colorScheme)}>
      {campScreenConfigs.map(({ name, title }) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{
            headerShown: true,
            title,
          }}
        />
      ))}
    </Stack>
  )
}

export default CampLayout