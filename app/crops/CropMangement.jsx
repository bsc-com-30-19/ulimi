import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const { width: screenWidth } = Dimensions.get('window');

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topLeftContainer}>
        <Text style={styles.text}>CROP MANAGEMENT</Text>
        <TouchableOpacity style={[styles.button, { width: screenWidth - 20 }]} onPress={() => alert('Tab clicked!')}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items at the start of the container
    alignItems: 'flex-start', // Align items to the start horizontally
  },
  topLeftContainer: {
    position: 'absolute',
    top: 10, // Distance from the top
    left: 10, // Distance from the left
    alignItems: 'flex-start', // Align items to the start horizontally within the container
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
    alignItems: 'flex-start', // Align text to the start horizontally within the button
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left', // Align text to the left
  },
});

export default Home;
