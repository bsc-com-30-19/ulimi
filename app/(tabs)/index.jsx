import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CROP MANAGEMENT</Text>
      <TouchableOpacity style={styles.button} onPress={() => alert('Tab clicked!')}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20, // Adds space between the text and button
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Home;
