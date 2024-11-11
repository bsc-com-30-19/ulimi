import { StyleSheet, Text, View } from 'react-native'
import { Slot, Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="Crops" options={{title: "String"}} />
      <Stack.Screen name="Crops" options={{title: "String"}} />
    </Stack>
  )
}

export default RootLayout

