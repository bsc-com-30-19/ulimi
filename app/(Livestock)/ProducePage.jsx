import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const ProduceItem = ({ item, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const [newQuantity, setNewQuantity] = useState(item.quantity.toString());

  return (
    <View style={styles.produceItem}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.textInput}
            value={newName}
            onChangeText={setNewName}
            placeholder="Produce Name"
          />
          <TextInput
            style={[styles.textInput, styles.quantityInput]}
            value={newQuantity}
            onChangeText={setNewQuantity}
            keyboardType="numeric"
            placeholder="Quantity"
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              onEdit(item.id, newName, parseInt(newQuantity, 10) || 0);
              setIsEditing(false);
            }}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View>
            <Text style={styles.produceText}>
              {item.name} - {item.quantity}
            </Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDelete(item.id)}
            >
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default function ProducePage() {
  const [produceInput, setProduceInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [produceList, setProduceList] = useState([]);

  const addProduce = () => {
    if (produceInput.trim() !== "" && quantityInput.trim() !== "") {
      setProduceList([
        ...produceList,
        {
          id: Date.now().toString(),
          name: produceInput,
          quantity: parseInt(quantityInput, 10) || 0,
        },
      ]);
      setProduceInput("");
      setQuantityInput("");
    }
  };

  const editProduce = (id, newName, newQuantity) => {
    setProduceList(
      produceList.map((item) =>
        item.id === id ? { ...item, name: newName, quantity: newQuantity } : item
      )
    );
  };

  const deleteProduce = (id) => {
    setProduceList(produceList.filter((item) => item.id !== id));
  };

  const filteredProduceList = produceList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/*<Text style={styles.header}>Manage Produce</Text>*/}
      <TextInput
        style={[styles.textInput, styles.searchBar]}
        placeholder="Search Produce"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Produce Name"
          value={produceInput}
          onChangeText={setProduceInput}
        />
        <TextInput
          style={[styles.textInput, styles.quantityInput]}
          placeholder="Quantity"
          value={quantityInput}
          onChangeText={setQuantityInput}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={addProduce}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredProduceList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProduceItem
            item={item}
            onEdit={editProduce}
            onDelete={deleteProduce}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No produce found.</Text>
        }
        onEndReachedThreshold={0.5}
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
  },
  searchBar:{
    marginBottom:20,
    padding:4,
    borderRadius:90,
    fontSize:16,
    flex: 0,
    marginTop: 0,
    shadowColor:'#999'
  },
 /*searchBar: {
    marginBottom: 40,
    backgroundColor: "#FFF",
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: 16,
    height:0, 
    borderRadius: 180,
    
  },*/
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
  quantityInput: {
    marginLeft: 8,
    maxWidth: 80,
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
    justifyContent: "space-between",
    width: 120,
  },
  editButton: {
    backgroundColor: "#FFEB3B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    backgroundColor: "#F44336",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    color: "#FFF",
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
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    backgroundColor:'#66BB6A'
  },
});
