import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

const API_URL = 'https://kazoomarc.pythonanywhere.com/api/crops/';

export default function CropsList() {
  const [crops, setCrops] = useState([]);
  const [editingCrop, setEditingCrop] = useState(null);
  const [newCropName, setNewCropName] = useState('');
  const router = useRouter();

  const fetchCrops = async () => {
    try {
      const response = await axios.get(API_URL);
      setCrops(response.data);
    } catch (err) {
      console.error('Error fetching crops:', err);
    }
  };

  const addCrop = async () => {
    if (!newCropName.trim()) {
      Alert.alert('Error', 'Crop name cannot be empty.');
      return;
    }
    try {
      const response = await axios.post(API_URL, { name: newCropName });
      setCrops([...crops, response.data]);
      setNewCropName('');
    } catch (err) {
      console.error('Error adding crop:', err);
    }
  };

  const deleteCrop = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setCrops(crops.filter((crop) => crop.id !== id));
    } catch (err) {
      console.error('Error deleting crop:', err);
    }
  };

  const editCrop = async (id, updatedName) => {
    if (!updatedName.trim()) {
      Alert.alert('Error', 'Crop name cannot be empty.');
      return;
    }
    try {
      const response = await axios.put(`${API_URL}${id}/`, {
        name: updatedName,
      });
      setCrops(
        crops.map((crop) =>
          crop.id === id ? { ...crop, name: response.data.name } : crop
        )
      );
      setEditingCrop(null);
    } catch (err) {
      console.error('Error editing crop:', err);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  return (
    <View style={styles.container}>
      {/* Add Crop Section */}
      <View style={styles.addCropContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter crop name"
          value={newCropName}
          onChangeText={setNewCropName}
        />
        <Button title="Add Crop" onPress={addCrop} />
      </View>

      {/* Crops List */}
      <FlatList
        data={crops}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cropItem}
            onPress={() => {
              if (editingCrop?.id === item.id) {
                editCrop(item.id, editingCrop.name);
              } else {
                setEditingCrop(item);
              }
            }}
          >
            {editingCrop?.id === item.id ? (
              <TextInput
                style={styles.input}
                value={editingCrop.name}
                onChangeText={(text) =>
                  setEditingCrop((prev) => ({ ...prev, name: text }))
                }
                autoFocus
              />
            ) : (
              <Text style={styles.cropName}>{item.name}</Text>
            )}
            <View style={styles.actions}>
              <Button title="Delete" onPress={() => deleteCrop(item.id)} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addCropContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  cropItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
});
