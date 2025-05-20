import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { getRGBColor } from "@/components/ui/gluestack-ui-provider/colors";
import { ModeType } from "@/components/ui/gluestack-ui-provider/types";
import { useAppFonts } from '@/hooks/useAppFonts';
import { useSession } from "@/hooks/useSession";
import { registerForPushNotificationsAsync } from "@/utils/notifiations";
import { getStackScreenOptions } from "@/utils/ui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from "nativewind";
import { useEffect } from 'react';
import { View } from "react-native";
import "../global.css";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useAppFonts();
  const { colorScheme, setColorScheme } = useColorScheme();
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
    queryClient.invalidateQueries();
  }, [fontsLoaded, error]);

  // Potential error? No waiting state
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('colorScheme');
        setColorScheme(savedTheme as ModeType);
      } catch (error) {
        console.error('Failed to load theme from AsyncStorage:', error);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  if (!fontsLoaded && !error) return null;

  if (isLoading) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode={colorScheme}>
        <View style={{ flex: 1, backgroundColor: getRGBColor("background", "0", colorScheme) }}>
          <Stack screenOptions={getStackScreenOptions(colorScheme)}>
            {session ? (
              <Stack.Screen name="(main)" />
            ) : (
              <Stack.Screen name="(auth)" />
            )}
          </Stack>
          <StatusBar />
        </View>
      </GluestackUIProvider>
    </QueryClientProvider>

  );
}