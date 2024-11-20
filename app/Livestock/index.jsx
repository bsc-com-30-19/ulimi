import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, Button } from 'react-native';

export default function Livestock() {
  const [currentScreen, setCurrentScreen] = useState('Dashboard');
  const [livestockData, setLivestockData] = useState([]);
  const [formData, setFormData] = useState({
    breed: '',
    purchaseDate: '',
    livestockType: '',
    farmedArea: '',
    numberOfLiv2estock: '',
  });
  const [selectedLivestock, setSelectedLivestock] = useState(null);

  const handleBack = () => {
    setCurrentScreen('LivestockList');
  };

  const renderDashboard = () => (
    <View style={styles.dashboardContainer}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <View style={styles.dashboardContent}>
        <TouchableOpacity style={styles.dashboardCard} onPress={() => setCurrentScreen('LivestockList')}>
          <Text style={styles.cardText}>Animals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dashboardCard} onPress={() => setCurrentScreen('ProduceList')}>
          <Text style={styles.cardText}>Produce</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dashboardCard} onPress={() => setCurrentScreen('TasksList')}>
          <Text style={styles.cardText}>Tasks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLivestockList = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
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
                setCurrentScreen('LivestockDetails');
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
        onPress={() => setCurrentScreen('AddLivestock')}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAddLivestock = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
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
          maxLength={10} 
          value={formData.purchaseDate}
          onChangeText={(text) => {
           
            let formattedText = text.replace(/[^0-9-]/g, ''); 
            if (formattedText.length === 5 || formattedText.length === 8) {
              formattedText = `${formattedText}-`; 
            }
            setFormData({ ...formData, purchaseDate: formattedText });
          }}
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
          onChangeText={(text) => setFormData({ ...formData, numberOfLivestock: text.replace(/[^0-9]/g, '') })}
        />
      </View>

      
      <Button
        title="Add"
        onPress={() => {
          if (
            formData.breed.trim() &&
            formData.purchaseDate.trim() &&
            formData.livestockType.trim() &&
            formData.farmedArea.trim() &&
            formData.numberOfLivestock.trim()
          ) {
            const newItem = { id: Date.now(), ...formData };
            setLivestockData([...livestockData, newItem]);
            setFormData({ breed: '', purchaseDate: '', livestockType: '', farmedArea: '', numberOfLivestock: '' });
            setCurrentScreen('LivestockList');
          } else {
            alert('Please fill in all fields');
          }
        }}
        color="#4CAF50"
      />
    </View>
  );

  const renderLivestockDetails = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Livestock Details</Text>
      </View>
      <Text style={styles.label}>Breed: {selectedLivestock?.breed}</Text>
      <Text style={styles.label}>Purchase Date: {selectedLivestock?.purchaseDate}</Text>
      <Text style={styles.label}>Livestock Type: {selectedLivestock?.livestockType}</Text>
      <Text style={styles.label}>Farmed Area: {selectedLivestock?.farmedArea}</Text>
      <Text style={styles.label}>Number of Livestock: {selectedLivestock?.numberOfLivestock}</Text>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          setFormData({ ...selectedLivestock });
          setCurrentScreen('EditLivestock');
        }}
      >
        <Text style={styles.floatingButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEditLivestock = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
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
          maxLength={10}
          value={formData.purchaseDate}
          onChangeText={(text) => {
           
            let formattedText = text.replace(/[^0-9-]/g, ''); 
            if (formattedText.length === 5 || formattedText.length === 8) {
              formattedText = `${formattedText}-`; 
            }
            setFormData({ ...formData, purchaseDate: formattedText });
          }}
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
          onChangeText={(text) => setFormData({ ...formData, numberOfLivestock: text.replace(/[^0-9]/g, '') })}
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          const updatedData = livestockData.map((item) =>
            item.id === selectedLivestock.id ? { ...item, ...formData } : item
          );
          setLivestockData(updatedData);
          setCurrentScreen('LivestockList');
        }}
      >
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setCurrentScreen('LivestockList')}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {currentScreen === 'Dashboard' && renderDashboard()}
      {currentScreen === 'LivestockList' && renderLivestockList()}
      {currentScreen === 'AddLivestock' && renderAddLivestock()}
      {currentScreen === 'LivestockDetails' && renderLivestockDetails()}
      {currentScreen === 'EditLivestock' && renderEditLivestock()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backArrow: { fontSize: 24 },
  title: { fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  inputLabel: { fontSize: 16, marginRight: 8, flex: 1 },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    flex: 2,
    paddingLeft: 10,
  },
  floatingButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: { color: 'white', fontSize: 30 },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: { textAlign: 'center', fontSize: 18, marginTop: 20 },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dashboardContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  dashboardCard: {
    width: '45%',
    height: 120,
    backgroundColor: '#A3C586',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  cardText: { fontSize: 18, color: '#3E3E3E', fontWeight: 'bold' },
});
