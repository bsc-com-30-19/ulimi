import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function HarvestDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [harvest, setHarvest] = useState(null);

  useEffect(() => {
    const fetchHarvest = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/crops-harvested/${id}/`);
        setHarvest(response.data);
      } catch (err) {
        console.error('Error fetching harvest data:', err);
      }
    };
    fetchHarvest();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this harvest?');
    if (confirmed) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/crops-harvested/${id}/`);
        alert('Harvest deleted successfully');
        router.push('/harvest');
      } catch (err) {
        console.error('Error deleting harvest:', err);
      }
    }
  };

  if (!harvest) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{harvest.name}</Text>
      <Text>Date: {harvest.date}</Text>
      <Text>Amount Harvested: {harvest.amount_harvested}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => router.push(`/harvest/edit/${harvest.id}`)} />
        <Button title="Delete" onPress={handleDelete} color="red" />
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
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
