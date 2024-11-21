import React from 'react';
import '../global.css';
import { Stack } from 'expo-router';


const StackExpo = () =>{
  return(
    <Stack >
      <Stack.Screen name="Index" options={{headerShown:false}}/>
      <Stack.Screen name="(home)" options={{headerShown:false}}/>
      <Stack.Screen name="(crops)" options={{headerShown:false}}/>
      <Stack.Screen name="(weather)" />
      <Stack.Screen name="(livestock)" />
      <Stack.Screen name="(data_viz)" />
    </Stack>
  )
}

export default function RootLayout() {

  return ( 
    <StackExpo />
  )
}
