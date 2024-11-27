import { Stack } from 'expo-router'

const Livestock = () => {
  return (
    <Stack>
      <Stack.Screen name="liveStockMenu" options={{headerShown: false,title:"Livestock"}}/>
      <Stack.Screen name="ProducePage" options={{headerShown: false,title:"Produce"}}/>
      <Stack.Screen name="TaskPage" options={{headerShown: false,title:"Tasks"}}/>
    </Stack>
  )
}

export default Livestock;

