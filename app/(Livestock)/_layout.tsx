import { Stack } from 'expo-router'

const Livestock = () => {
  return (
    <Stack>
      <Stack.Screen name="liveStockMenu" options={{headerShown: false,title:"Livestock"}}/>

    </Stack>
  )
}

export default Livestock;

