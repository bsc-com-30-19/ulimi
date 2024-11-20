import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import {Drawer} from 'expo-router/drawer'
import CustomDrawerContent from '@/components/Drawer/CustomDrawerContent'
const StackLayout = () => {
  return (
    <Drawer drawerContent={CustomDrawerContent} initialRouteName='index' >
        <Drawer.Screen name="index" options={{title:'Home', drawerLabel:'Home'}}/>
        <Drawer.Screen name="auth" options={{title:'SignUp', drawerLabel:'SignUp'}}/>
        <Drawer.Screen name="(helpSupport)" options={{title:'Help and Support', drawerLabel:'Help and Support'}}/>
    </Drawer>
  )
}

export default StackLayout