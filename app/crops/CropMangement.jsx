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
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.smallButton} onPress={() => alert('Button 1 clicked!')}>
            <Text style={styles.buttonText}>Button 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={() => alert('Button 2 clicked!')}>
            <Text style={styles.buttonText}>Button 2</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.smallButton} onPress={() => alert('Button 3 clicked!')}>
            <Text style={styles.buttonText}>Button 3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={() => alert('Button 4 clicked!')}>
            <Text style={styles.buttonText}>Button 4</Text>
          </TouchableOpacity>
        </View>
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
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10, // Adds space between rows of buttons
  },
  smallButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginRight: 10, // Adds space between buttons in the row
  },
});

export default Home;
