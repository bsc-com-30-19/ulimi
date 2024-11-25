import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="dataScreen" options={{ headerShown:false}} />
    </Stack>
  );
}
