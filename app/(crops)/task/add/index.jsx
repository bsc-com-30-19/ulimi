import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function AddTask() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSave = async () => {
    if (!name.trim() || !dueDate.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/tasks/', {
        name,
        due_date: dueDate,
      });
      alert('Task added successfully');
      router.push('/task');
    } catch (err) {
      console.error('Error adding task:', err);
      alert('Error adding task: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Task</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Task Name"
      />

      {/* Use native input type="date" for the due date */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={styles.dateInput}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          onPress={() => router.push('/task')}
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
    width: '100%', // Make sure it fills the container width
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
