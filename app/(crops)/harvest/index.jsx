import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function HarvestList() {
  const [harvests, setHarvests] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchHarvests = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/crops-harvested/');
        setHarvests(response.data);
      } catch (err) {
        console.error('Error fetching harvests:', err);
      }
    };
    fetchHarvests();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Add Harvest" onPress={() => router.push('/harvest/add')} />
      <FlatList
        data={harvests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => router.push(`/harvest/${item.id}`)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
            <Text>{item.date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
