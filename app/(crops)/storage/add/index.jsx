import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function AddCropToStorage() {
  const router = useRouter();
  
  // State for the crop's name and amount
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  // Handle form submission to add the crop to storage
  const handleSave = async () => {
    try {
      if (!name.trim()) {
        alert('Please enter a crop name');
        return;
      }
      if (!amount.trim() || isNaN(amount) || parseFloat(amount) <= 0) {
        alert('Please enter a valid amount');
        return;
      }

      // POST request to add the crop to storage
      await axios.post('http://127.0.0.1:8000/api/crops-in-storage/', {
        name,
        amount: parseFloat(amount), // Ensure the amount is sent as a number
      });

      alert('Crop added to storage successfully');
      router.push('/storage'); // Redirect to the storage list page after saving
    } catch (error) {
      console.error('Error adding crop to storage:', error);
      alert('Error adding crop: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Crop to Storage</Text>
      
      {/* Crop Name Input */}
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Crop Name"
      />
      
      {/* Crop Amount Input */}
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount in Storage"
        keyboardType="numeric"
      />
      
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          onPress={() => router.push('/storage')} // Redirect to storage list
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
