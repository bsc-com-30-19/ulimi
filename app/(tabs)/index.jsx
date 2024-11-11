import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import LivestockScreen from './Livestock/LivestockScreen';
import ProduceScreen from './Livestock/ProduceScreen';
import TasksScreen from './Livestock/TasksScreen';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

export default function index(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Livestock" component={LivestockScreen}/>
        <Stack.Screen name="Produce" component={ProduceScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}