import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function CropDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [crop, setCrop] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchCropDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/crops/${id}/`
        );
        setCrop(response.data);
      } catch (err) {
        console.error('Error fetching crop details:', err);
      }
    };

    fetchCropDetail();
  }, [id]);

  const handleDelete = async () => {
    // For web, use window.confirm instead of Alert
    const confirmed = window.confirm(
      'Are you sure you want to delete this crop?'
    );

    if (confirmed) {
      try {
        setIsDeleting(true);
        console.log('Sending delete request for crop ID:', id);

        await axios.delete(`http://localhost:8000/api/crops/${id}/`);

        console.log('Delete successful');
        alert('Crop deleted successfully');
        router.push('/test_backend/');
      } catch (error) {
        console.error('Delete error:', error);
        setIsDeleting(false);
        alert('Failed to delete crop: ' + error.message);
      }
    }
  };

  if (!crop) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{crop.name}</Text>
      <Text style={styles.description}>Description: {crop.description}</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Edit"
          onPress={() => router.push(`/test_backend/edit/${crop.id}`)}
          disabled={isDeleting}
        />
        <Button
          title={isDeleting ? 'Deleting...' : 'Delete'}
          color="red"
          onPress={handleDelete}
          disabled={isDeleting}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
