{/*import React, { useState } from "react";
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
});*/}
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Button, StyleSheet, ScrollView } from 'react-native';

export default function ProducePage({ navigation }) {
  const [livestockData, setProduceData] = useState([]);
  const [formData, setFormData] = useState({
    ProduceType: '',
    Amount: '',
    CollectedDate: '',
   
  });
  const [selectedProduce, setSelectedProduce] = useState(null);
  const [viewMode, setViewMode] = useState('list'); 

 
  const renderProduceList = () => (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.title}> Produce List</Text>
      </View>
      {livestockData.length > 0 ? (
        <FlatList
          data={ProduceData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                setSelectedProduce(item);
                setViewMode('details');
              }}
            >
              <Text>{item.type}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No produce added yet.</Text>
      )}
      
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setViewMode('add')}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );


  const renderAddProduce = () => (
    <View style={styles.container}>
    
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>ProduceType:</Text>
        <TextInput
          style={styles.input}
          value={formData.ProduceType}
          onChangeText={(text) => setFormData({ ...formData, ProduceType: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Amount:</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={formData.Amount}
          onChangeText={(text) => setFormData({ ...formData, Amount: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>CollectedDate(YYYY-MM-DD):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.CollectedDate}
          onChangeText={(text) =>
            setFormData({ ...formData, CollectedDate: text.replace(/[^0-9-]/g, '') })
          }
        />
      </View>
      
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (
            formData.type &&
            formData.Amount&&
            formData.CollectedDate 
            
           
          ) {
            const newItem = { id: Date.now(), ...formData };
            setProduceData([...produceData, newItem]);
            setFormData({
              ProduceType: '',
              Amount: '',
              CollectedDate: '',
             
            });
            setViewMode('list');
          }
        }}
      >
        <Text style={styles.buttonText}>Add Produce</Text>
      </TouchableOpacity>
    </View>
  );


  const renderProduceDetails = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setViewMode('list')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Produce Details</Text>
      </View>
      <Text style={styles.label}>ProduceType: {selectedProduce?.ProduceType}</Text>
      <Text style={styles.label}>Amount: {selectedProduce?.Amount}</Text>
      <Text style={styles.label}>CollectedDate: {selectedProduce?.CollectedDate}</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => setViewMode('edit')}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEditProduce = () => (
    <View style={styles.container}>
     
     <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>ProduceType:</Text>
        <TextInput
          style={styles.input}
          value={formData.ProduceType}
          onChangeText={(text) => setFormData({ ...formData, ProduceType: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Amount:</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={formData.Amount}
          onChangeText={(text) => setFormData({ ...formData, Amount: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>CollectedDate(YYYY-MM-DD):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.CollectedDate}
          onChangeText={(text) =>
            setFormData({ ...formData, CollectedDate: text.replace(/[^0-9-]/g, '') })
          }
        />
      </View>
      
      
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const updatedData = produceData.map((item) =>
            item.id === selectedProduce.id ? { ...item, ...formData } : item
          );
          setProduceData(updatedData);
          setViewMode('list');
        }}
      >
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
  

  switch (viewMode) {
    case 'list':
      return renderProduceList();
    case 'add':
      return renderAddProduce();
    case 'details':
      return renderProduceDetails();
    case 'edit':
      return renderEditProduce();
    default:
      return renderProduceList();
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, backgroundColor: '#4CAF50'},
  backArrow: { fontSize: 20, marginRight: 40 },
  title: { fontSize: 20, fontWeight: 'bold' , color: 'default'},
  listItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4CAF50', 
    borderRadius: 50,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, 
  },
  floatingButtonText: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  //inputContainer: { marginBottom: 20},
  inputLabel: { fontSize: 14,  marginBottom: 0},
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, fontSize: 16 },
  button: {
    backgroundColor: '#4CAF50', 
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  label: { fontSize: 16, marginVertical: 5 },
  emptyText: { fontSize: 16, color: '#888' },
});