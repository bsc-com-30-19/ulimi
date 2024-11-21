import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

export default function CropDetail({ route, navigation }) {
  const { cropId } = route.params;
  const [crop, setCrop] = useState(null);

  useEffect(() => {
    const fetchCropDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/crops/${cropId}/`
        );
        setCrop(response.data);
      } catch (err) {
        console.error('Error fetching crop details:', err);
      }
    };

    fetchCropDetail();
  }, [cropId]);

  const handleDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this crop?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`http://localhost:8000/api/crops/${cropId}/`);
              navigation.goBack();
            } catch (err) {
              console.error('Error deleting crop:', err);
            }
          },
        },
      ]
    );
  };

  if (!crop) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{crop.name}</Text>
      <Text>Description: {crop.description}</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Edit"
          onPress={() => navigation.navigate('CropEdit', { crop })}
        />
        <Button title="Delete" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
