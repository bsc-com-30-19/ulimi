import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="CropHome" options={{ headerShown:false}} />
      <Stack.Screen name="croppage" options={{headerShown:false}} />
    </Stack>
  );
}
