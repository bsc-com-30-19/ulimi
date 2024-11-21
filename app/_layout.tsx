import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import '../global.css';
import Index from './index';
import SignUp from './auth';
import HelpScreen from './(helpSupport)';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/app-throwaway/(tabs)/FarmManagement';
import StackLayout from './(stack)/_layout';
import Livestock from './(Livestock)/_layout';

const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

const StackNavigator = () =>{
  <Stack>
    <Stack.Screen name='(stack)' />
  </Stack>
}

const DrawerNavigator = () =>{
  return(
    <Drawer.Navigator initialRouteName='auth'>        
        <Drawer.Screen name="index" component={Index} options={{drawerLabel: 'Home',title: 'overview',}}/>
        <Drawer.Screen name="auth" component={SignUp} />
        <Drawer.Screen name="(helpSupport)" component={HelpScreen} options={{ title: 'Help and Support' }}/>
        <Drawer.Screen name="(stack)" component={StackLayout} options={{headerShown:false, title:'ff'}}/>
    </Drawer.Navigator> 
  )
}

export default function RootLayout() {

  return ( 
    <DrawerNavigator />
  )
}
