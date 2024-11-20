import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import '../global.css';
import Index from './(home)/index';
import SignUp from './(home)/auth';
import HelpScreen from './(home)/(helpSupport)';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { Drawer } from "expo-router/drawer";
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/app-throwaway/(tabs)/FarmManagement';
import StackLayout from './(home)/_layout';

const Drawerx = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

const StackNavigator = () =>{
  <Stack>
    <Stack.Screen name='(stack)' />
  </Stack>
}

const DrawerNavigator = () =>{
  return(
    <Drawerx.Navigator initialRouteName='auth'>        
        <Drawerx.Screen name="(index)" component={Index} options={{drawerxLabel: 'Home',title: 'Home',}}/>
        <Drawerx.Screen name="auth" component={SignUp} />
        <Drawerx.Screen name="(helpSupport)" component={HelpScreen} options={{ title: 'Help and Support' }}/>
    </Drawerx.Navigator> 
  )
}
const StackExpo = () =>{
  return(
    <Stack >
      <Stack.Screen name="Index"/>
      <Stack.Screen name="(home)" options={{headerShown:false}}/>
      <Stack.Screen name="(crops)" />
      <Stack.Screen name="(weather)" />
      <Stack.Screen name="(livestock)" />
      <Stack.Screen name="(data_viz)" />
    </Stack>
  )
}
const DrawerExpo = () =>{
  return(
    <Drawer>
      <Drawer.Screen name="(home)" options={{headerShadowVisible:false}}/>
      <Drawer.Screen name="(crops)" options={{headerShown:false}}/>
      <Drawer.Screen name="auth" />
      <Drawer.Screen name="(helpSupport)"/>
    </Drawer>
  )
}

export default function RootLayout() {

  return ( 
    <StackExpo />
  )
}
