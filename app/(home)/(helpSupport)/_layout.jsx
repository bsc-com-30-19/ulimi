import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="helpScreen" options={{ title: 'Help and Support' , headerShown:false}} />
    </Stack>
  );
}
