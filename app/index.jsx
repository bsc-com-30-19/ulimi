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
        <View style={styles.centeredContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.largeButton} onPress={() => alert('Crops clicked!')}>
              <Text style={styles.buttonText}>Crops</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.largeButton} onPress={() => alert('Storage clicked!')}>
              <Text style={styles.buttonText}>Storage</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.largeButton} onPress={() => alert('Tasks clicked!')}>
              <Text style={styles.buttonText}>Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.largeButton} onPress={() => alert('Harvest clicked!')}>
              <Text style={styles.buttonText}>Harvest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topLeftContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth - 40,
    marginTop: 10,
  },
  largeButton: {
    backgroundColor: 'green',
    padding: 40,
    borderRadius: 40,
    width: (screenWidth - 60) / 2, // Width divided by 2 with some spacing
    alignItems: 'center',
  },
});

export default Home;
