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

export default function CropsInStorageList() {
  const [crops, setCrops] = useState([]); // State to store crops
  const router = useRouter(); // Use router instead of navigation

  // Fetch crops from the API on component mount
  useEffect(() => {
    const fetchCropsInStorage = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/crops-in-storage/');
        setCrops(response.data); // Set the crops data from the response
      } catch (err) {
        console.error('Error fetching crops in storage:', err);
      }
    };

    fetchCropsInStorage();
  }, []); // Empty dependency array to fetch data only once on mount

  return (
    <View style={styles.container}>
      {/* Button to navigate to Add Crop in Storage page */}
      <Button
        title="Add Crop to Storage"
        onPress={() => router.push(`/storage/add/`)} // Navigate to add page
      />
      {/* FlatList to render the list of crops */}
      <FlatList
        data={crops} // Data to be rendered in the list
        keyExtractor={(item) => item.id.toString()} // Key for each item
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cropItem}
            onPress={() => router.push(`/storage/${item.id}`)} // Navigate to crop details page
          >
            <Text style={styles.cropName}>{item.name}</Text>
            <Text>Amount: {item.amount}</Text>
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
