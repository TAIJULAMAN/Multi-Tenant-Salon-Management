import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { useState } from 'react';
import { useFonts, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { Onboarding } from '@/components/onboarding';
import { Login } from '@/components/login';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [appState, setAppState] = useState<'onboarding' | 'login' | 'app'>('onboarding');

  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      {appState === 'onboarding' && <Onboarding onComplete={() => setAppState('login')} />}
      {appState === 'login' && <Login onComplete={() => setAppState('app')} />}
      {appState === 'app' && <AppTabs />}
    </ThemeProvider>
  );
}
