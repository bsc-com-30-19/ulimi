import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import { Link } from 'expo-router'; // Import Link from expo-router

const { width: screenWidth } = Dimensions.get('window');

const Home = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topLeftContainer}>
        <Text style={styles.text}>CROP MANAGEMENT</Text>

        {/* Menu button */}
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>

        {/* Menu */}
        {menuVisible && (
          <View style={styles.menu}>
            <Link href="/croppage" style={styles.menuItem}>
              Go to crops screen
            </Link>
            <Link href="/storage" style={styles.menuItem}>
              Go to storage screen
            </Link>
            <Link href="/tasks" style={styles.menuItem}>
              Go to tasks screen
            </Link>
            <Link href="/harvest" style={styles.menuItem}>
              Go to harvest screen
            </Link>
          </View>
        )}

        <TouchableOpacity style={[styles.button, { width: screenWidth - 20 }]} onPress={() => alert('Tab clicked!')}>
          <View style={styles.buttonContent}>
            <Icon name="arrow-back" size={20} color="white" /> {/* Back icon */}
          </View>
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
  menuButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  menu: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  menuItem: {
    fontSize: 20,
    color: 'white',
    marginVertical: 5,
  },
  button: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'flex-start',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 5,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  largeButton: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 5,
    margin: 10,
    width: screenWidth * 0.4, // Make the button take 40% of the screen width
    aspectRatio: 1, // Make the button square
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
