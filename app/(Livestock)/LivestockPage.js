import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Button, StyleSheet, ScrollView } from 'react-native';

export default function LivestockPage({ navigation }) {
  const [livestockData, setLivestockData] = useState([]);
  const [formData, setFormData] = useState({
    breed: '',
    purchaseDate: '',
    livestockType: '',
    farmedArea: '',
    numberOfLivestock: '',
  });
  const [selectedLivestock, setSelectedLivestock] = useState(null);
  const [viewMode, setViewMode] = useState('list'); 

 
  const renderLivestockList = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Livestock List</Text>
      </View>
      {livestockData.length > 0 ? (
        <FlatList
          data={livestockData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                setSelectedLivestock(item);
                setViewMode('details');
              }}
            >
              <Text>{item.breed}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No livestock added yet.</Text>
      )}
      
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setViewMode('add')}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );


  const renderAddLivestock = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setViewMode('list')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add Livestock</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Breed:</Text>
        <TextInput
          style={styles.input}
          value={formData.breed}
          onChangeText={(text) => setFormData({ ...formData, breed: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Purchase Date (YYYY-MM-DD):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.purchaseDate}
          onChangeText={(text) =>
            setFormData({ ...formData, purchaseDate: text.replace(/[^0-9-]/g, '') })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Livestock Type:</Text>
        <TextInput
          style={styles.input}
          value={formData.livestockType}
          onChangeText={(text) => setFormData({ ...formData, livestockType: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Farmed Area:</Text>
        <TextInput
          style={styles.input}
          value={formData.farmedArea}
          onChangeText={(text) => setFormData({ ...formData, farmedArea: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Number of Livestock:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.numberOfLivestock}
          onChangeText={(text) =>
            setFormData({ ...formData, numberOfLivestock: text.replace(/[^0-9]/g, '') })
          }
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (
            formData.breed &&
            formData.purchaseDate &&
            formData.livestockType &&
            formData.farmedArea &&
            formData.numberOfLivestock
          ) {
            const newItem = { id: Date.now(), ...formData };
            setLivestockData([...livestockData, newItem]);
            setFormData({
              breed: '',
              purchaseDate: '',
              livestockType: '',
              farmedArea: '',
              numberOfLivestock: '',
            });
            setViewMode('list');
          }
        }}
      >
        <Text style={styles.buttonText}>Add Livestock</Text>
      </TouchableOpacity>
    </View>
  );


  const renderLivestockDetails = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setViewMode('list')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Livestock Details</Text>
      </View>
      <Text style={styles.label}>Breed: {selectedLivestock?.breed}</Text>
      <Text style={styles.label}>Purchase Date: {selectedLivestock?.purchaseDate}</Text>
      <Text style={styles.label}>Livestock Type: {selectedLivestock?.livestockType}</Text>
      <Text style={styles.label}>Farmed Area: {selectedLivestock?.farmedArea}</Text>
      <Text style={styles.label}>
        Number of Livestock: {selectedLivestock?.numberOfLivestock}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setViewMode('edit')}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );


  const renderEditLivestock = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setViewMode('list')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Livestock</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Breed:</Text>
        <TextInput
          style={styles.input}
          value={formData.breed}
          onChangeText={(text) => setFormData({ ...formData, breed: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Purchase Date (YYYY-MM-DD):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.purchaseDate}
          onChangeText={(text) =>
            setFormData({ ...formData, purchaseDate: text.replace(/[^0-9-]/g, '') })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Livestock Type:</Text>
        <TextInput
          style={styles.input}
          value={formData.livestockType}
          onChangeText={(text) => setFormData({ ...formData, livestockType: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Farmed Area:</Text>
        <TextInput
          style={styles.input}
          value={formData.farmedArea}
          onChangeText={(text) => setFormData({ ...formData, farmedArea: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Number of Livestock:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.numberOfLivestock}
          onChangeText={(text) =>
            setFormData({ ...formData, numberOfLivestock: text.replace(/[^0-9]/g, '') })
          }
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const updatedData = livestockData.map((item) =>
            item.id === selectedLivestock.id ? { ...item, ...formData } : item
          );
          setLivestockData(updatedData);
          setViewMode('list');
        }}
      >
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );

  switch (viewMode) {
    case 'list':
      return renderLivestockList();
    case 'add':
      return renderAddLivestock();
    case 'details':
      return renderLivestockDetails();
    case 'edit':
      return renderEditLivestock();
    default:
      return renderLivestockList();
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backArrow: { fontSize: 24, marginRight: 10 },
  title: { fontSize: 24, fontWeight: 'bold' },
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
  inputContainer: { marginBottom: 15 },
  inputLabel: { fontSize: 16, marginBottom: 5 },
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

