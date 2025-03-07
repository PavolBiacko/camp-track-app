import { useAppFonts } from '@/hooks/useUtilHooks';
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from 'react';
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [fontsLoaded, error] = useAppFonts();

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, animation: 'none' }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'ios_from_right' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'ios_from_right' }} />
    </Stack>
  )
}
