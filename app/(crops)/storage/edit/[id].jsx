import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function EditStorage() {
  const { id } = useLocalSearchParams(); // Get the ID of the crop storage from URL params
  const router = useRouter();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Loading state for data fetching

  // Fetch the storage data when the component loads
  useEffect(() => {
    const fetchStorageData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/crops-in-storage/${id}/`);
        setName(response.data.name); // Set the crop name
        setAmount(response.data.amount); // Set the crop amount
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error('Error fetching storage data:', err);
        alert('Failed to load storage data.');
        router.push('/storage'); // Redirect to storage list if there's an error
      }
    };

    fetchStorageData();
  }, [id]); // Re-fetch data if the ID changes

  // Handle saving the updated storage data
  const handleSave = async () => {
    if (!name.trim() || !amount.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/crops-in-storage/${id}/`, {
        name,
        amount: parseFloat(amount), // Ensure amount is treated as a number
      });
      alert('Storage updated successfully');
      router.push('/storage'); // Redirect to storage list after saving
    } catch (err) {
      console.error('Error saving storage data:', err);
      alert('Error updating storage data: ' + err.message);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>; // Show loading until data is fetched
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Storage</Text>

      {/* Input for crop name */}
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Crop Name"
      />

      {/* Input for crop amount */}
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount in Storage"
        keyboardType="numeric" // Ensure the user can only input numbers
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          onPress={() => router.push('/storage')} // Redirect to storage list on cancel
          color="gray"
        />
        <Button
          title="Save"
          onPress={handleSave} // Save the updated crop storage data
        />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
