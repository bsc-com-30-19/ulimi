import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function TaskPage() {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]); 
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  const completeTask = (taskIndex) => {
    const taskToComplete = tasks[taskIndex];
    setTasks(tasks.filter((_, index) => index !== taskIndex));
    setCompletedTasks([...completedTasks, taskToComplete]);
  };

  const deleteTask = (taskIndex) => {
    setCompletedTasks(completedTasks.filter((_, index) => index !== taskIndex));
  };

  return (
    <View style={styles.container}>
      
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter a task"
          value={taskInput}
          onChangeText={setTaskInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      
      <Text style={styles.sectionTitle}>Tasks to Complete</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.taskItem} onPress={() => completeTask(index)}>
            <Text style={styles.taskText}>{item}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks to complete.</Text>}
      />

  
      <Text style={styles.sectionTitle}>Completed Tasks</Text>
      <FlatList
        data={completedTasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.completedTaskItem}>
            <Text style={styles.completedTaskText}>{item}</Text>
            <TouchableOpacity onPress={() => deleteTask(index)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No completed tasks.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#fff',
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: '#66BB6A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  taskItem: {
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 4,
    marginBottom: 8,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
  },
  completedTaskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#D3D3D3',
    borderRadius: 4,
    marginBottom: 8,
    elevation: 2,
  },
  completedTaskText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  deleteText: {
    color: '#FF5252',
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
