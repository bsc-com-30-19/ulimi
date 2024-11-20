import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false,title:"signup"}}/>
    </Stack>
  )
}

export default AuthLayout
