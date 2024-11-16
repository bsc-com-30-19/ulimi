import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Crops</Text>
      </View>
      <Text style={styles.text}>Crops</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 20,
    fontWeight: '600', // Semi-bold
  },
  text: {
    color: 'white',
    marginTop: 60, // Adjust based on the height of the top bar
  },
});
