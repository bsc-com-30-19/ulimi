import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const StackLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='(crops)' />
        <Stack.Screen name='(weather)' />
        <Stack.Screen name='(livestock)' />
        <Stack.Screen name='(data_viz)' />
    </Stack>
  )
}

export default StackLayout