import { Slot } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'


const RootLayout = () => {
  return (
<<<<<<< HEAD
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
=======
    <Slot/>
  )
>>>>>>> pauls-work
}
