import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

export default function CropsCRUD() {
  const [crops, setCrops] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCrop, setCurrentCrop] = useState({ name: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch Crops
  const fetchCrops = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/crops/');
      setCrops(response.data);
    } catch (err) {
      console.error('Error fetching crops:', err);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  // Add/Edit Crop
  const handleSubmit = async () => {
    try {
      if (isEditing) {
        // Update existing crop
        await axios.put(
          `http://localhost:8000/api/crops/${currentCrop.id}/`,
          currentCrop
        );
      } else {
        // Create new crop
        await axios.post('http://localhost:8000/api/crops/', currentCrop);
      }
      fetchCrops(); // Refresh list
      setModalVisible(false);
      setCurrentCrop({ name: '', description: '' });
    } catch (err) {
      console.error('Error saving crop:', err);
    }
  };

  // Delete Crop
  const deleteCrop = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/crops/${id}/`);
      fetchCrops(); // Refresh list
    } catch (err) {
      console.error('Error deleting crop:', err);
    }
  };

  // Edit Crop
  const editCrop = (crop) => {
    setCurrentCrop(crop);
    setIsEditing(true);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Add New Crop"
        onPress={() => {
          setCurrentCrop({ name: '', description: '' });
          setIsEditing(false);
          setModalVisible(true);
        }}
      />

      <FlatList
        data={crops}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cropItem}>
            <Text>Name: {item.name}</Text>
            <Text>Description: {item.description}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => editCrop(item)} />
              <Button
                title="Delete"
                onPress={() => deleteCrop(item.id)}
                color="red"
              />
            </View>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            placeholder="Crop Name"
            value={currentCrop.name}
            onChangeText={(text) =>
              setCurrentCrop({ ...currentCrop, name: text })
            }
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={currentCrop.description}
            onChangeText={(text) =>
              setCurrentCrop({ ...currentCrop, description: text })
            }
            style={styles.input}
          />
          <Button
            title={isEditing ? 'Update Crop' : 'Add Crop'}
            onPress={handleSubmit}
          />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  cropItem: {
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
