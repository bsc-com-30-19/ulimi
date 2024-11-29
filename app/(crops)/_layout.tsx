import { Stack } from 'expo-router';
import * as SQLite from 'expo-sqlite';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="CropHome" options={{title:'Crops'}} />
      <Stack.Screen name="croppage" options={{title:'Crops'}} />
      <Stack.Screen name="cropDetails/[id]" options={{title:'Crop Details'}} />
      <Stack.Screen name="harvest/Harvest" options={{title:'Harvests'}} />
      <Stack.Screen name="storage/Storage" options={{title:'Storage'}} />
      <Stack.Screen name="task/TaskList" options={{title:'Tasks'}}/>
    </Stack>
  );
}
