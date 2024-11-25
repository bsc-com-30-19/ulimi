import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function EditTask() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`);
        setName(response.data.name);
        setDueDate(response.data.due_date);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching task data:', err);
        alert('Failed to load task data.');
        router.push('/task');
      }
    };

    fetchTaskData();
  }, [id]);

  const handleSave = async () => {
    if (!name.trim() || !dueDate.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        name,
        due_date: dueDate,
      });
      alert('Task updated successfully');
      router.push('/task');
    } catch (err) {
      console.error('Error updating task:', err);
      alert('Error updating task: ' + err.message);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Task</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Task Name"
      />

      {/* Use native input type="date" for date picker */}
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
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
