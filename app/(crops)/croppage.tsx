import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router'; // Import Link from expo-router

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Crops</Text>
      </View>
      <View style={styles.listContainer}>
        
          <Link href="/Maize" style={styles.link}>
            🌽 Maize
          </Link>
      
       
          <Link href="/tobacco" style={styles.link}>
            🚬 Tobacco
          </Link>
       
      
          <Link href="/groundnuts" style={styles.link}>
            🥜 Ground Nuts
          </Link>
   
      
          <Link href="/cassava" style={styles.link}>
            🥥 Cassava
          </Link>
      
      </View>
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
