import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="CropHome" options={{title:'Crops'}} />
      <Stack.Screen name="croppage" options={{title:'Crops'}} />
    </Stack>
  );
}
