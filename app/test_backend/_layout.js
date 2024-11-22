import { Stack } from 'expo-router';

export default function CropsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Crops List' }} />
      <Stack.Screen name="[id]" options={{ title: 'Crop Details' }} />
      <Stack.Screen name="edit/[id]" options={{ title: 'Edit Crop' }} />
    </Stack>
  );
}
