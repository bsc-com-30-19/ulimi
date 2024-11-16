import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Crops</Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItem}>🌽 Maize</Text>
        <Text style={styles.listItem}>🚬 Tobacco</Text>
        <Text style={styles.listItem}>🥜 Ground Nuts</Text>
        <Text style={styles.listItem}>🥥 Cassava</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topBar: {
    width: '100%',
    backgroundColor: 'green',
    padding: 15,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600', // Semi-bold
  },
  listContainer: {
    marginTop: 80, // Adjust based on the height of the top bar
    marginLeft: 20, // Position the list a bit away from the left edge
    alignItems: 'flex-start',
  },
  listItem: {
    color: 'black',
    fontSize: 45,
    marginVertical: 30,
  },
});

