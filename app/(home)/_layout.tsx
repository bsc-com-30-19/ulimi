import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import {Drawer} from 'expo-router/drawer'
import CustomDrawerContent from '@/components/Drawer/CustomDrawerContent'
const StackLayout = () => {
  return (
    <Drawer drawerContent={CustomDrawerContent} initialRouteName='index' >
        <Drawer.Screen name="index" options={{title:'Home', drawerLabel:'Home'}}/>
        <Drawer.Screen name="signup" options={{title:'Sign Up',drawerItemStyle:{display:'none'}}}/>
        <Drawer.Screen name="(helpSupport)" options={{title:'Help and Support', drawerLabel:'Help and Support'}}/>
        <Drawer.Screen name="accountManagement" options={{title:'Account Management', drawerLabel:'Account Management'}}/>
    </Drawer>
  )
}

export default StackLayout