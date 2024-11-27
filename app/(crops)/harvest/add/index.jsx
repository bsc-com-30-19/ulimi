import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function AddHarvest() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [amountHarvested, setAmountHarvested] = useState('');

  const handleSave = async () => {
    if (!name.trim() || !date.trim() || !amountHarvested.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/crops-harvested/', {
        name,
        date,
        amount_harvested: amountHarvested,
      });
      alert('Harvest added successfully');
      router.push('/harvest');
    } catch (err) {
      console.error('Error adding harvest:', err);
      alert('Error adding harvest: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Harvest</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Harvest Name"
      />

      {/* Date picker for web */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={styles.dateInput}
      />

      <TextInput
        style={styles.input}
        value={amountHarvested}
        onChangeText={setAmountHarvested}
        placeholder="Amount Harvested"
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={() => router.push('/harvest')} color="gray" />
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
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
