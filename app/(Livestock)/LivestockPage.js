import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Button, StyleSheet, ScrollView } from 'react-native';

export default function LivestockPage({ navigation }) {
  const [livestockData, setLivestockData] = useState([]);
  const [formData, setFormData] = useState({
   Name:'',
    BirthDate: '',
    VaccinationStatus: '',
    LivestockType: '',

  });
  const [selectedLivestock, setSelectedLivestock] = useState(null);
  const [viewMode, setViewMode] = useState('list'); 

 
  const renderLivestockList = () => (
    <View style={styles.container}>
      <View style={styles.header}>
      {/*<TouchableOpacity onPress={() => setViewMode('list')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>*/}
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
              <Text>{item.name}</Text>
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
      {/*<View style={styles.header}>
        <TouchableOpacity onPress={() => setViewMode('list')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add Livestock</Text>
      </View>*/}
       <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Name:</Text>
        <TextInput
          style={styles.input}
          value={formData.Name}
          onChangeText={(text) => setFormData({ ...formData, Name: text })}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}> Date of birth (YYYY-MM-DD):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.BirthDate}
          onChangeText={(text) =>
            setFormData({ ...formData, BirthDate: text.replace(/[^0-9-]/g, '') })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Livestock Type:</Text>
        <TextInput
          style={styles.input}
          value={formData.LivestockType}
          onChangeText={(text) => setFormData({ ...formData, LivestockType: text })}
        />
      </View>
     
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (
            formData.Name &&
            formData.BirthDate &&
            formData.VaccinationStatus &&
           
            formData.LivestockType
          ) {
            const newItem = { id: Date.now(), ...formData };
            setLivestockData([...livestockData, newItem]);
            setFormData({
              Name: '',
              BirthDate: '',
              VaccinationStatus: '',
             
              LivestockType: '',
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
      <Text style={styles.label}>Name: {selectedLivestock?.breed}</Text>
      <Text style={styles.label}>BirthDate: {selectedLivestock?.purchaseDate}</Text>
      <Text style={styles.label}>VaccinationStatus: {selectedLivestock?.livestockType}</Text>
      <Text style={styles.label}>LivestockType: {selectedLivestock?.farmedArea}</Text>
      
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
      {/*<View style={styles.header}>
        <TouchableOpacity onPress={() => setViewMode('list')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Livestock</Text>
      </View>*/}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Name:</Text>
        <TextInput
          style={styles.input}
          value={formData.Name}
          onChangeText={(text) => setFormData({ ...formData, Name: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Birth Date (YYYY-MM-DD):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.BirthDate}
          onChangeText={(text) =>
            setFormData({ ...formData, BirthDate: text.replace(/[^0-9-]/g, '') })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Vaccination Status:</Text>
        <TextInput
          style={styles.input}
          value={formData.VaccinationStatus}
          onChangeText={(text) => setFormData({ ...formData, VaccinationStatus: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Livestock Type:</Text>
        <TextInput
          style={styles.input}
          value={formData.LivestockType}
          onChangeText={(text) => setFormData({ ...formData, LivestockType: text })}
        />
      </View>
      {/*<View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Number of Livestock:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.numberOfLivestock}
          onChangeText={(text) =>
            setFormData({ ...formData, numberOfLivestock: text.replace(/[^0-9]/g, '') })
          }
        />
      </View>*/}
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
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, backgroundColor: '#4CAF50'},
  backArrow: { fontSize: 20, marginRight: 40 },
  title: { fontSize: 20, fontWeight: 'bold', color: 'default' },
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