import { ScreenConfigs } from '@/types/base';
import { getStackScreenOptions } from '@/utils/ui';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

const campScreenConfigs: ScreenConfigs[] = [
  { name: 'sessions/index', title: 'Turnusy' },
  { name: 'sessions/update-session', title: 'Editačný formulár turnusu' },
  { name: 'sessions/create-session', title: 'Vytvárací formulár turnusu' },
  { name: 'children/index', title: 'Deti' },
  { name: 'children/update-child', title: 'Editačný formulár dieťata' },
  { name: 'children/create-child', title: 'Vytvárací formulár dieťata' },
  { name: 'groups/index', title: 'Oddiely' },
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