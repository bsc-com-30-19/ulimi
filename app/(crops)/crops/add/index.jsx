import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Platform } from 'react-native'; // Added Platform import
import axios from 'axios';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker'; // For mobile date picker

export default function AddCrop() {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [amountPlanted, setAmountPlanted] = useState('');
  const [expectedYieldDate, setExpectedYieldDate] = useState('');
  const [datePlanted, setDatePlanted] = useState('');
  const [isDatePlantedPickerVisible, setDatePlantedPickerVisible] = useState(false);
  const [isExpectedYieldDatePickerVisible, setExpectedYieldDatePickerVisible] = useState(false);

  const handleSave = async () => {
    try {
      if (!name.trim()) {
        alert('Please enter a crop name');
        return;
      }

      // POST request to add a new crop with all the new fields
      await axios.post('http://localhost:8000/api/crops/', {
        name,
        amount_planted: parseFloat(amountPlanted),  // Ensure the amount is a float
        expected_yield_date: expectedYieldDate,
        date_planted: datePlanted,
      });

      alert('Crop added successfully');
      router.push('/test_backend/');
    } catch (error) {
      console.error('Error adding crop:', error);
      alert('Error adding crop: ' + error.message);
    }
  };

  const handleDatePlantedConfirm = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setDatePlanted(currentDate.toISOString().split('T')[0]); // Set the date in YYYY-MM-DD format
    setDatePlantedPickerVisible(false);
  };

  const handleExpectedYieldDateConfirm = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setExpectedYieldDate(currentDate.toISOString().split('T')[0]); // Set the date in YYYY-MM-DD format
    setExpectedYieldDatePickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Crop</Text>
      
      {/* Crop Name */}
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Crop Name"
      />

      {/* Amount Planted */}
      <TextInput
        style={styles.input}
        value={amountPlanted}
        onChangeText={setAmountPlanted}
        placeholder="Amount Planted"
        keyboardType="numeric"
      />

      {/* Date Planted */}
      {Platform.OS === 'web' ? (
        <input
          type="date"
          value={datePlanted}
          onChange={(e) => setDatePlanted(e.target.value)}
          style={styles.input}
        />
      ) : (
        <TextInput
          style={styles.input}
          value={datePlanted}
          onFocus={() => setDatePlantedPickerVisible(true)}
          placeholder="Date Planted"
          editable={false}
        />
      )}

      {/* Expected Yield Date */}
      {Platform.OS === 'web' ? (
        <input
          type="date"
          value={expectedYieldDate}
          onChange={(e) => setExpectedYieldDate(e.target.value)}
          style={styles.input}
        />
      ) : (
        <TextInput
          style={styles.input}
          value={expectedYieldDate}
          onFocus={() => setExpectedYieldDatePickerVisible(true)}
          placeholder="Expected Yield Date"
          editable={false}
        />
      )}

      {/* Date Picker Modals for Mobile */}
      {Platform.OS !== 'web' && (
        <>
          <DateTimePicker
            isVisible={isDatePlantedPickerVisible}
            mode="date"
            onConfirm={handleDatePlantedConfirm}
            onCancel={() => setDatePlantedPickerVisible(false)}
          />
          
          <DateTimePicker
            isVisible={isExpectedYieldDatePickerVisible}
            mode="date"
            onConfirm={handleExpectedYieldDateConfirm}
            onCancel={() => setExpectedYieldDatePickerVisible(false)}
          />
        </>
      )}

      {/* Buttons */}
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
