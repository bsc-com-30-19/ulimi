import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Platform } from 'react-native'; // Added Platform import
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker'; // For mobile date picker

export default function CropEdit() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  // State variables to store form data
  const [name, setName] = useState('');
  const [amountPlanted, setAmountPlanted] = useState('');
  const [expectedYieldDate, setExpectedYieldDate] = useState('');
  const [datePlanted, setDatePlanted] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDatePlantedPickerVisible, setDatePlantedPickerVisible] = useState(false);
  const [isExpectedYieldDatePickerVisible, setExpectedYieldDatePickerVisible] = useState(false);

  // Fetch existing crop data from the backend
  useEffect(() => {
    const fetchCropData = async () => {
      try {
        console.log('Fetching crop data for ID:', id);
        const response = await axios.get(`http://localhost:8000/api/crops/${id}/`);
        console.log('Received data:', response.data);
        
        // Populate state with fetched data
        setName(response.data.name);
        setAmountPlanted(response.data.amount_planted.toString()); // Ensure this is a string for the input
        setExpectedYieldDate(response.data.expected_yield_date);
        setDatePlanted(response.data.date_planted);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching crop data:', error);
        alert('Error loading crop data');
        router.push('/test_backend/');
      }
    };

    fetchCropData();
  }, [id]);

  // Handle save of updated crop data
  const handleSave = async () => {
    try {
      if (!name.trim()) {
        alert('Please enter a crop name');
        return;
      }

      // PUT request to update the crop
      await axios.put(`http://localhost:8000/api/crops/${id}/`, {
        name,
        amount_planted: parseFloat(amountPlanted),  // Ensure the amount is a float
        expected_yield_date: expectedYieldDate,
        date_planted: datePlanted,
      });

      alert('Crop updated successfully');
      router.push('/test_backend/');
    } catch (error) {
      console.error('Error updating crop:', error);
      alert('Error updating crop: ' + error.message);
    }
  };

  // Handle date confirmation (Mobile)
  const handleDatePlantedConfirm = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setDatePlanted(currentDate.toISOString().split('T')[0]); // Set date in YYYY-MM-DD format
    setDatePlantedPickerVisible(false);
  };

  const handleExpectedYieldDateConfirm = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setExpectedYieldDate(currentDate.toISOString().split('T')[0]); // Set date in YYYY-MM-DD format
    setExpectedYieldDatePickerVisible(false);
  };

  // If data is loading, show a loading state
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Crop</Text>

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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
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
