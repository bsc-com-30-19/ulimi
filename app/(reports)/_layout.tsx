import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name='reports' options={{title:'Reports'}}/>
        <Stack.Screen name='crops' options={{title:'Crops'}}/>
        <Stack.Screen name='livestock' options={{title:'Livestock'}}/>
        <Stack.Screen name='finances' options={{title:'Finances'}}/>
        <Stack.Screen name='reportsave' options={{title:'Save Report'}}/>
    </Stack>
  )
}

export default _layout