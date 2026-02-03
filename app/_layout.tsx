import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  KumbhSans_400Regular,
  KumbhSans_500Medium,
  KumbhSans_700Bold,
} from '@expo-google-fonts/kumbh-sans';
import {
  EncodeSansExpanded_400Regular,
  EncodeSansExpanded_700Bold,
} from '@expo-google-fonts/encode-sans-expanded';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'KumbhSans-Regular': KumbhSans_400Regular,
    'KumbhSans-Medium': KumbhSans_500Medium,
    'KumbhSans-Bold': KumbhSans_700Bold,
    'EncodeSansExpanded-Regular': EncodeSansExpanded_400Regular,
    'EncodeSansExpanded-Bold': EncodeSansExpanded_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
