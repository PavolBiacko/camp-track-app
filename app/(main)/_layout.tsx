import AppProviders from '@/components/custom/AppProviders'
import Loading from '@/components/custom/Loading'
import { useAuth } from '@/hooks/useAuth'
import { getStackScreenOptions } from '@/utils/ui'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'

const AppLayout = () => {
  const { colorScheme } = useColorScheme();
  const { user, isLoading, isError } = useAuth();

  if (!user || isLoading || isError) {
    return <Loading showText={true} />;
  }

  return (
    <AppProviders leaderId={user.id}>
      <Stack screenOptions={getStackScreenOptions(colorScheme)}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(settings)" />
        <Stack.Screen name="(schedule)" />
        <Stack.Screen name="(finance)" />
      </Stack>
    </AppProviders>
  )
}

export default AppLayout