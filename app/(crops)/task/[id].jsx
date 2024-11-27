import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [task, setTask] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTaskDetail = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`);
        setTask(response.data);
      } catch (err) {
        console.error('Error fetching task details:', err);
      }
    };

    fetchTaskDetail();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      try {
        setIsDeleting(true);
        await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`);
        alert('Task deleted successfully');
        router.push('/task');
      } catch (err) {
        console.error('Delete error:', err);
        setIsDeleting(false);
        alert('Error deleting task: ' + err.message);
      }
    }
  };

  if (!task) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.name}</Text>
      <Text style={styles.dueDate}>Due Date: {task.due_date}</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Edit"
          onPress={() => router.push(`/task/edit/${task.id}`)}
          disabled={isDeleting}
        />
        <Button
          title={isDeleting ? 'Deleting...' : 'Delete'}
          color="red"
          onPress={handleDelete}
          disabled={isDeleting}
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
    marginBottom: 10,
  },
  dueDate: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
