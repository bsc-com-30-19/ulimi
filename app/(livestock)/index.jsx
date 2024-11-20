
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const index = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ulimi </Text>
      </View>
      <View style={styles.gridContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LivestockScreen', { category: 'Produce' })}
        >
          <Text style={styles.buttonText}>Livestock</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProduceScreen', { category: 'Livestock' })}
          
        >
          <Text style={styles.buttonText}>Produce</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TasksScreen', { category: 'Tasks' })}
        >
          <Text style={styles.buttonText}>Tasks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#8bc34a',
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#8bc34a',
    padding: 40,
    borderRadius: 10,
    width: '45%',
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default index;
