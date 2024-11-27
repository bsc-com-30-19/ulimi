import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function CropDetail() {
  const { id } = useLocalSearchParams(); // Get the crop ID from the URL params
  const router = useRouter();
  const [crop, setCrop] = useState(null); // To store the crop data
  const [isDeleting, setIsDeleting] = useState(false); // To manage the delete button state

  // Fetch the crop details based on the ID
  useEffect(() => {
    const fetchCropDetail = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/crops-in-storage/${id}/` // Update with the new API endpoint
        );
        setCrop(response.data); // Set the crop details into the state
      } catch (err) {
        console.error('Error fetching crop details:', err);
        alert('Failed to fetch crop details.');
      }
    };

    fetchCropDetail();
  }, [id]); // Refetch crop details when the ID changes

  // Handle the deletion of the crop
  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this crop?');
    if (confirmed) {
      try {
        setIsDeleting(true); // Disable buttons during deletion
        await axios.delete(`http://127.0.0.1:8000/api/crops-in-storage/${id}/`); // Send DELETE request
        alert('Crop deleted successfully');
        router.push('/storage'); // Redirect to the storage page after deletion
      } catch (error) {
        console.error('Delete error:', error);
        setIsDeleting(false); // Re-enable buttons on error
        alert('Failed to delete crop: ' + error.message);
      }
    }
  };

  if (!crop) {
    return <Text>Loading...</Text>; // Show loading until crop details are fetched
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{crop.name}</Text>
      <Text style={styles.amount}>Amount in Storage: {crop.amount} kg</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Edit"
          onPress={() => router.push(`/storage/edit/${crop.id}`)} // Navigate to edit page
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
  amount: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
