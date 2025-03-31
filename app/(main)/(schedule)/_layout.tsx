import { getRGBColor } from '@/components/ui/gluestack-ui-provider/colors'
import { ScheduleParams } from '@/types/schedule'
import { getHeaderTitle } from '@/utils'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'

const ScheduleLayout = () => {
  const { colorScheme } = useColorScheme()

  return (
    <Stack screenOptions={{
      animation: 'ios_from_right',
      headerShown: false,
      headerStyle: { backgroundColor: getRGBColor("background", "0", colorScheme) },
      headerTitleStyle: { color: getRGBColor("typography", "950", colorScheme) },
      headerTintColor: getRGBColor("typography", "950", colorScheme),
      contentStyle: { backgroundColor: getRGBColor("background", "0", colorScheme) }
    }}>
      <Stack.Screen
        name="index"
        options={({ route }) => {
          const params = route.params as ScheduleParams | undefined;
          return {
            headerShown: true,
            headerTitle: getHeaderTitle(params),
          };
        }}
      />
    </Stack>
  )
}

export default ScheduleLayout