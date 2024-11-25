import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="weather" options={{ title: 'Weather' }} />
    </Stack>
  );
}
