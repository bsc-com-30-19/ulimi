import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router'; // Import Link from expo-router
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddButton from '@/components/forms/AddButton';
import CropList from '@/components/livestock/CropList';


export default function AboutScreen() {
  const {bottom} = useSafeAreaInsets();

  return (
    
    <View className='flex flex-1'>
      <View className='w-full mx-4'>
          <CropList cropName='Maize' link='/Maize'/>
          <CropList cropName='Tobacco' link='tobacco'/>
      </View>
      <AddButton style={{paddingBottom: bottom + 40}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topBar: {
    width: '100%',
    backgroundColor: 'green',
    padding: 15,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600', // Semi-bold
  },
  listContainer: {
    marginTop: 80, // Adjust based on the height of the top bar
    marginLeft: 30, // Position the list a bit away from the left edge
    alignItems: 'flex-start',
  },
  listItem: {
    marginBottom: 40,
  },
  link: {
    color: 'black',
    fontSize: 45,
  },
});
