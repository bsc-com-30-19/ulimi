import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';

export default function Livestock() {
  const [currentScreen, setCurrentScreen] = useState('Dashboard'); 
  const [livestockData, setLivestockData] = useState([]); 
  const [selectedLivestock, setSelectedLivestock] = useState(null); 
  const [formData, setFormData] = useState({ breed: '', purchaseDate: '', livestockType: '', farmedArea: '', numberOfLivestock: '' }); // Form data for add/edit


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
              <Text>{item?.breed}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No livestock added yet.</Text>
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => setCurrentScreen('AddLivestock')}>
        <Text style={styles.addButtonText}>+ Add Livestock</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAddLivestock = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Livestock</Text>
      </View>
      <TextInput
        placeholder="Breed"
        style={styles.input}
        value={formData.breed}
        onChangeText={(text) => setFormData({ ...formData, breed: text })}
      />
      <TextInput
        placeholder="Purchase Date"
        style={styles.input}
        value={formData.purchaseDate}
        onChangeText={(text) => setFormData({ ...formData, purchaseDate: text })}
      />
      <TextInput
        placeholder="Livestock Type"
        style={styles.input}
        value={formData.livestockType}
        onChangeText={(text) => setFormData({ ...formData, livestockType: text })}
      />
      <TextInput
        placeholder="Farmed Area"
        style={styles.input}
        value={formData.farmedArea}
        onChangeText={(text) => setFormData({ ...formData, farmedArea: text })}
      />
      <TextInput
        placeholder="Number of Livestock"
        style={styles.input}
        value={formData.numberOfLivestock}
        onChangeText={(text) => setFormData({ ...formData, numberOfLivestock: text })}
      />
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
      <Button title="Cancel" onPress={() => setCurrentScreen('LivestockList')} color="#4CAF" />
    </View>
  );

  const renderLivestockDetails = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Livestock Details</Text>
      </View>
      <Text style={styles.label}>Breed: {selectedLivestock?.breed}</Text>
      <Text style={styles.label}>Purchase Date: {selectedLivestock?.purchaseDate}</Text>
      <Text style={styles.label}>Livestock Type: {selectedLivestock?.livestockType}</Text>
      <Text style={styles.label}>Farmed Area: {selectedLivestock?.farmedArea}</Text>
      <Text style={styles.label}>Number of Livestock: {selectedLivestock?.numberOfLivestock}</Text>
      <Button
        title="Edit"
        onPress={() => {
          setFormData({ ...selectedLivestock });
          setCurrentScreen('EditLivestock');
        }}
        color="#4CAF50"
      />
    </View>
  );

  const renderEditLivestock = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Livestock</Text>
      </View>
      <TextInput
        placeholder="Breed"
        style={styles.input}
        value={formData.breed}
        onChangeText={(text) => setFormData({ ...formData, breed: text })}
      />
      <TextInput
        placeholder="Purchase Date"
        style={styles.input}
        value={formData.purchaseDate}
        onChangeText={(text) => setFormData({ ...formData, purchaseDate: text })}
      />
      <TextInput
        placeholder="Livestock Type"
        style={styles.input}
        value={formData.livestockType}
        onChangeText={(text) => setFormData({ ...formData, livestockType: text })}
      />
      <TextInput
        placeholder="Farmed Area"
        style={styles.input}
        value={formData.farmedArea}
        onChangeText={(text) => setFormData({ ...formData, farmedArea: text })}
      />
      <TextInput
        placeholder="Number of Livestock"
        style={styles.input}
        value={formData.numberOfLivestock}
        onChangeText={(text) => setFormData({ ...formData, numberOfLivestock: text })}
      />
      <Button
        title="Save Changes"
        onPress={() => {
          if (formData.breed.trim() && formData.purchaseDate.trim() && formData.livestockType.trim() && formData.farmedArea.trim() && formData.numberOfLivestock.trim()) {
            setLivestockData(
              livestockData.map((item) => (item.id === selectedLivestock.id ? { ...item, ...formData } : item))
            );
            setCurrentScreen('LivestockList');
          } else {
            alert('Please fill in all fields');
          }
        }}
        color="#4CAF50"
      />
      <Button title="Cancel" onPress={() => setCurrentScreen('LivestockList')} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'Dashboard' && renderDashboard()}
      {currentScreen === 'LivestockList' && renderLivestockList()}
      {currentScreen === 'AddLivestock' && renderAddLivestock()}
      {currentScreen === 'LivestockDetails' && renderLivestockDetails()}
      {currentScreen === 'EditLivestock' && renderEditLivestock()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  dashboardContainer: { flex: 1, backgroundColor: '#F9FFF4', padding: 16 },
  backButton: { marginBottom: 10 },
  backArrow: { fontSize: 24, color: '#4CAF50' },
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
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginLeft: 16 },
  emptyText: { textAlign: 'center', marginVertical: 16, fontSize: 16, color: '#888' },
  listItem: { padding: 16, backgroundColor: '#E8F5E9', marginBottom: 8, borderRadius: 8 },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  label: { fontSize: 16, marginBottom: 8 },
});
