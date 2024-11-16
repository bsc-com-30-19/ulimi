import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import { Link } from 'expo-router'; // Import Link from expo-router

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Home = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topLeftContainer}>
        <Text style={styles.titleText}>CROP MANAGEMENT</Text>

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

        <TouchableOpacity style={[styles.backButton, { width: screenWidth - 20 }]} onPress={() => alert('Tab clicked!')}>
          <View style={styles.buttonContent}>
            <Text style={styles.backButtonText}>CROP MANAGEMENT</Text>
            <Icon name="arrow-back" size={20} color="white" /> {/* Back icon */}
          </View>
        </TouchableOpacity>

        <View style={styles.centeredContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.largeButton} onPress={() => alert('Crops clicked!')}>
              <ImageBackground source={require('./assets/crops.jpg')} style={styles.imageBackground}>
                <Text style={styles.buttonText}>Crops</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.largeButton} onPress={() => alert('Storage clicked!')}>
              <ImageBackground source={require('./assets/storage.jpg')} style={styles.imageBackground}>
                <Text style={styles.buttonText}>Storage</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.largeButton} onPress={() => alert('Tasks clicked!')}>
              <ImageBackground source={require('./assets/tasks.jpg')} style={styles.imageBackground}>
                <Text style={styles.buttonText}>Tasks</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.largeButton} onPress={() => alert('Harvest clicked!')}>
              <ImageBackground source={require('./assets/harvest.jpg')} style={styles.imageBackground}>
                <Text style={styles.buttonText}>Harvest</Text>
              </ImageBackground>
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
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
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
  backButton: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align the items on opposite ends
    width: '100%',
  },
  backButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
    margin: 8,
    width: screenWidth * 0.4, // Make the button take 50% of the screen width
    aspectRatio: 1, // Make the button square
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Optional: add a semi-transparent background to the text
    padding: 5,
    borderRadius: 5,
  },
});

export default Home;
