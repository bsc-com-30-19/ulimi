import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Dashboard({ navigation }) {
  return (
    <View style={styles.dashboardContainer}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <View style={styles.dashboardContent}>
        <TouchableOpacity
          style={styles.dashboardCard}
          onPress={() => navigation.navigate('LivestockList')}
        >
          <Text style={styles.cardText}>Animals</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dashboardCard}
          onPress={() => navigation.navigate('ProduceList')}
        >
          <Text style={styles.cardText}>Produce</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dashboardCard}
          onPress={() => navigation.navigate('TasksList')}
        >
          <Text style={styles.cardText}>Tasks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dashboardContainer: { flex: 1, padding: 16 },
  backButton: { marginBottom: 20 },
  backArrow: { fontSize: 24 },
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
});
