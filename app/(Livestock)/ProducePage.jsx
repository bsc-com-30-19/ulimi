import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

export default function ProducePage() {
  const [produceInput, setProduceInput] = useState("");
  const [produceList, setProduceList] = useState([]);

  const addProduce = () => {
    if (produceInput.trim() !== "") {
      setProduceList([...produceList, { id: Date.now().toString(), name: produceInput }]);
      setProduceInput("");
    }
  };
  const editProduce = (id, newName) => {
    setProduceList(
      produceList.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  const deleteProduce = (id) => {
    setProduceList(produceList.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(item.name);

    return (
      <View style={styles.produceItem}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.textInput}
              value={newName}
              onChangeText={setNewName}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                editProduce(item.id, newName);
                setIsEditing(false);
              }}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.produceText}>{item.name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteProduce(item.id)}
              >
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Produce"
          value={produceInput}
          onChangeText={setProduceInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={addProduce}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={produceList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No produce added yet.</Text>
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
  produceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFF",
    borderRadius: 4,
    marginBottom: 8,
    elevation: 2,
  },
  produceText: {
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 8,
  },
  deleteButton: {},
  actionText: {
    color: "#Ff0000",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#66BB6A",
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    color: "#999",
    textAlign: "center",
    marginTop: 8,
    fontStyle: "italic",
  },
});
