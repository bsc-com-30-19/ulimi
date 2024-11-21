import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function AddCrop() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = async () => {
    try {
      if (!name.trim()) {
        alert('Please enter a crop name');
        return;
      }

      // POST request to add a new crop
      await axios.post('http://localhost:8000/api/crops/', {
        name,
        description,
      });

      alert('Crop added successfully');
      router.push('/test_backend/');
    } catch (error) {
      console.error('Error adding crop:', error);
      alert('Error adding crop: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Crop</Text>
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
