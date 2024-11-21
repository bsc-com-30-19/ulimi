import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

export default function CropsList({ navigation }) {
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
    // Add listener to refresh when navigating back
    const unsubscribe = navigation.addListener('focus', fetchCrops);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={crops}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cropItem}
            onPress={() =>
              navigation.navigate('CropDetail', { cropId: item.id })
            }
          >
            <Text style={styles.cropName}>{item.name}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  cropItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
