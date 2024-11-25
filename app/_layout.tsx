import React from 'react';
import '../global.css';
import { Stack } from 'expo-router';


const StackExpo = () =>{
  return(
    <Stack initialRouteName='Index' >
      <Stack.Screen name="Index" options={{headerShown:false}}/>
      <Stack.Screen name="(home)" options={{headerShown:false}}/>
      <Stack.Screen name="(crops)" options={{title:'Crops'}}/>
      <Stack.Screen name="(weather)" options={{title:'Weather'}}/>
      <Stack.Screen name="(livestock)" options={{title:'Livestock'}}/>
      <Stack.Screen name="(reports)" options={{headerShown:false}}/>
      <Stack.Screen name="(data_viz)" options={{title:'Data Vizualition'}}/>
      <Stack.Screen name="(finances)" />
    </Stack>
  )
}

export default function RootLayout() {

  return ( 
    <StackExpo />
  )
}
