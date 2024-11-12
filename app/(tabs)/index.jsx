import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import LivestockScreen from '../Livestock/LivestockScreen';
import ProduceScreen from '../Livestock/ProduceScreen';
import TasksScreen from '../Livestock/TasksScreen';
import HomeScreen from '../Livestock/HomeScreen';
import LivestockDetails from '../Livestock/LivestockDetails';

const Stack = createNativeStackNavigator();

export default function index(){
  return (
    <NavigationContainer>
      <Stack.Navigator >
      <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="LivestockScreen" component={LivestockScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Cattle" component={LivestockDetails}options={{ headerShown: false }} />
        <Stack.Screen name="ProduceScreen" component={ProduceScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="TasksScreen" component={TasksScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LivestockDetails" component={LivestockDetails} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}