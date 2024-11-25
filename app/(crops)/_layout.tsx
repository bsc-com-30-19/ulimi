import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="CropHome" options={{ title: 'index' }} />
      <Stack.Screen name="croppage" options={{ title: 'croppage' }} />
    </Stack>
  );
}
