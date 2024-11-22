import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";

const TaskItem = ({ task, onComplete, onDelete }) => {
  return (
    <View style={styles.taskItem}>
      <Text style={[styles.taskText, task.completed && styles.completedText]}>
        {task.name}
      </Text>
      <View style={styles.actions}>
        {!task.completed && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => onComplete(task.id)}
          >
            <Text style={styles.actionText}>Complete</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(task.id)}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function TaskPage() {
  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState([]); // Initially, no tasks are added

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTaskList([
        ...taskList,
        {
          id: Date.now().toString(), // Unique ID based on current timestamp
          name: taskInput,
          completed: false,
        },
      ]);
      setTaskInput(""); // Clear input after task is added
    }
  };

  const completeTask = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const deleteTask = (id) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          setTaskList((prevList) => prevList.filter((task) => task.id !== id)); // Remove task by ID
        },
      },
    ]);
  };

  const uncompletedTasks = taskList.filter((task) => !task.completed);
  const completedTasks = taskList.filter((task) => task.completed);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Tasks</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Task Name"
          value={taskInput}
          onChangeText={setTaskInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>Uncompleted Tasks</Text>
      <FlatList
        data={uncompletedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onComplete={completeTask}
            onDelete={deleteTask}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet.</Text>}
      />

      <Text style={styles.sectionHeader}>Completed Tasks</Text>
      <FlatList
        data={completedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onComplete={completeTask}
            onDelete={deleteTask}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No completed tasks.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    backgroundColor:'#66BB6A'
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#fff",
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: "#66BB6A",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFF",
    borderRadius: 4,
    marginBottom: 8,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
  },
  completedText: {
    color: "#4CAF50",
  },
  actions: {
    flexDirection: "row",
  },
  completeButton: {
    backgroundColor: "#FFEB3B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  actionText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  emptyText: {
    color: "#999",
    textAlign: "center",
    marginTop: 8,
    fontStyle: "italic",
  },
  /*header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    backgroundColor:'#66BB6A'
  */
});
