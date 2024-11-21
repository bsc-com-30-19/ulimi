import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function CropEdit({ route, navigation }) {
  const { crop } = route.params;
  const [name, setName] = useState(crop.name);
  const [description, setDescription] = useState(crop.description);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/api/crops/${crop.id}/`, {
        name,
        description,
      });
      navigation.goBack();
    } catch (err) {
      console.error('Error updating crop:', err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Crop Name"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
