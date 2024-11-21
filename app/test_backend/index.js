import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router'; // Change this
import axios from 'axios';

export default function CropsList() {
  const [crops, setCrops] = useState([]);
  const router = useRouter(); // Use router instead of navigation

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
      <Button title="Add" onPress={() => router.push(`/test_backend/add/`)} />
      <FlatList
        data={crops}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cropItem}
            onPress={() => router.push(`/test_backend/${item.id}`)} // Change this
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
