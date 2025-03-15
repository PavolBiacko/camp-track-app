import useAuth from '@/hooks/useAuth';
import { useAppFonts } from '@/hooks/useUtilHooks';
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [fontsLoaded, error] = useAppFonts();
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null;

  if (isLoading) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {!session ? (
          <Stack.Screen name="(auth)" options={{ animation: 'ios_from_right' }} />
        ) : (
          <Stack.Screen name="(tabs)" options={{ animation: 'ios_from_right' }} />
        )}
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}
