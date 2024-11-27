import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function EditHarvest() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [amountHarvested, setAmountHarvested] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHarvest = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/crops-harvested/${id}/`);
        setName(response.data.name);
        setDate(response.data.date);
        setAmountHarvested(response.data.amount_harvested);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching harvest data:', err);
      }
    };
    fetchHarvest();
  }, [id]);

  const handleSave = async () => {
    if (!name.trim() || !date.trim() || !amountHarvested.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/crops-harvested/${id}/`, {
        name,
        date,
        amount_harvested: amountHarvested,
      });
      alert('Harvest updated successfully');
      router.push('/harvest');
    } catch (err) {
      console.error('Error updating harvest:', err);
      alert('Error updating harvest: ' + err.message);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Harvest</Text>

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
        <Button
          title="Cancel"
          onPress={() => router.push('/harvest')}
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
