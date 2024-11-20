import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import {Drawer} from 'expo-router/drawer'
const StackLayout = () => {
  return (
    <Drawer initialRouteName='index'>
        <Drawer.Screen name="index" />
        <Drawer.Screen name="auth"/>
        <Drawer.Screen name="(helpSupport)"/>
    </Drawer>
  )
}

export default StackLayout