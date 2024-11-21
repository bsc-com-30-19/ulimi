import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native'; // Added Text import
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function CropEdit() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch existing crop data
  useEffect(() => {
    const fetchCropData = async () => {
      try {
        console.log('Fetching crop data for ID:', id);
        const response = await axios.get(
          `http://localhost:8000/api/crops/${id}/`
        );
        console.log('Received data:', response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching crop data:', error);
        alert('Error loading crop data');
        router.push('/test_backend/');
      }
    };

    fetchCropData();
  }, [id]);

  const handleSave = async () => {
    try {
      if (!name.trim()) {
        alert('Please enter a crop name');
        return;
      }

      await axios.put(`http://localhost:8000/api/crops/${id}/`, {
        name,
        description,
      });

      alert('Crop updated successfully');
      router.push('/test_backend/');
    } catch (error) {
      console.error('Error updating crop:', error);
      alert('Error updating crop: ' + error.message);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Crop Name"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
        numberOfLines={4}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          onPress={() => router.push('/test_backend/')}
          color="gray"
        />
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
