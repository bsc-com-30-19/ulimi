import { Slot, Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
      name="(tabs)"/>
    </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})
