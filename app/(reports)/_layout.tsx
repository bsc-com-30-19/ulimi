import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name='reports'/>
        <Stack.Screen name='crops'/>
        <Stack.Screen name='livestock'/>
        <Stack.Screen name='finances'/>
        <Stack.Screen name='reportsave'/>
    </Stack>
  )
}

export default _layout