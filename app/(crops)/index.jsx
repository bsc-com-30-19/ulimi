import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import { Link } from 'expo-router';
import axios from 'axios';

const { width: screenWidth } = Dimensions.get('window');

const Home = () => {
  const [crops, setCrops] = useState([]);
  
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/crops/');
        setCrops(response.data);
      } catch (err) {
        console.error('Error fetching crops:', err);
      }
    };

    fetchCrops();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.topLeftContainer}>
        <Text style={styles.text}>CROP MANAGEMENT</Text>
        <Link href="/croppage" style={styles.button}>
        Go to crops screen
        </Link>
        <Link href="/storage" style={styles.button}>
        Go to storage screen
        </Link>
        <Link href="/Tasks" style={styles.button}>
        Go to Tasks screen
        </Link>
        <Link href="/Harvest" style={styles.button}>
        Go to Harvest screen
        </Link>
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
    width: (screenWidth - 60) / 2,
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'black',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'black',
  },
});

export default Home;
