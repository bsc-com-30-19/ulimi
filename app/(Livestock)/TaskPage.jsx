import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const TaskPage = () => {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [manualDateInput, setManualDateInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleManualDateInput = (date) => {
    setManualDateInput(date);
    const validDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    if (!validDate) {
      Alert.alert('Invalid date format', 'Please use the format YYYY-MM-DD');
    }
  };

  const addOrUpdateTask = () => {
    if (taskInput && manualDateInput) {
      if (isEditing) {
        const updatedTasks = tasks.map((task, index) =>
          index === editIndex ? { task: taskInput, date: manualDateInput } : task
        );
        setTasks(updatedTasks);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        const newTask = { task: taskInput, date: manualDateInput };
        setTasks([...tasks, newTask]);
      }
      setTaskInput('');
      setManualDateInput('');
    } else {
      Alert.alert('Missing Information', 'Please enter a task and a valid date');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setTaskInput(tasks[index].task);
    setManualDateInput(tasks[index].date);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Task Page</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={taskInput}
        onChangeText={setTaskInput}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter date (YYYY-MM-DD)"
        value={manualDateInput}
        onChangeText={handleManualDateInput}
      />

      <TouchableOpacity style={styles.button} onPress={addOrUpdateTask}>
        <Text style={styles.buttonText}>{isEditing ? 'Update Task' : 'Add Task'}</Text>
      </TouchableOpacity>

      <View style={styles.tasksContainer}>
        {tasks.length === 0 ? (
          <Text>No tasks yet</Text>
        ) : (
          tasks.map((task, index) => (
            <View key={index} style={styles.taskItem}>
              <Text>{task.task}</Text>
              <Text>{task.date}</Text>
              <View style={styles.taskActions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editTask(index)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteTask(index)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  tasksContainer: {
    marginTop: 20,
  },
  taskItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 5,
    borderRadius: 5,
  },
});

export default TaskPage;
