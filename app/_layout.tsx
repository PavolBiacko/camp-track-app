import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useSession } from '@/hooks/useSession';
import { useAppFonts } from '@/hooks/useUtilHooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import "../global.css";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useAppFonts();
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
    // queryClient.invalidateQueries();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  if (isLoading) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="system">
        <Stack screenOptions={{ headerShown: false }}>
          {!session ? (
            <Stack.Screen name="(auth)" options={{ animation: 'ios_from_right' }} />
          ) : (
            <Stack.Screen name="(tabs)" options={{ animation: 'ios_from_right' }} />
          )}
        </Stack>
        <StatusBar />
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}