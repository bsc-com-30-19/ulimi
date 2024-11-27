import { Stack } from 'expo-router'

const Livestock = () => {
  return (
    <Stack>
      <Stack.Screen name="liveStockMenu" options={{title:"Livestock"}}/>
      <Stack.Screen name="LivestockPage" options={{title:"Livestock"}}/>
      <Stack.Screen name="ProducePage" options={{title:"Produce"}}/>
      <Stack.Screen name="TaskPage" options={{title:"Tasks"}}/>
    </Stack>
  )
}

export default Livestock;

