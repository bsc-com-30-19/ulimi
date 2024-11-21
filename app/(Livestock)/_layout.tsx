import { Stack } from 'expo-router'

const Livestock = () => {
  return (
    <Stack>
      <Stack.Screen name="Produce" options={{headerShown: false,title:"Livestock"}}/>
    </Stack>
  )
}

export default Livestock;

