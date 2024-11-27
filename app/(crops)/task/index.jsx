import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function TasksList() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/tasks/');
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Add Task" onPress={() => router.push('/task/add')} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskItem}
            onPress={() => router.push(`/task/${item.id}`)}
          >
            <Text style={styles.taskName}>{item.name}</Text>
            <Text style={styles.dueDate}>Due: {item.due_date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  taskItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dueDate: {
    fontSize: 14,
    color: '#555',
  },
});
