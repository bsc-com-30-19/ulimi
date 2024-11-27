import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.topTab}>
          <Text style={styles.tabText}>MAIZE</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>GENERAL DETAILS</Text>
          <View style={styles.details}>
            <Text style={styles.detailText}>- Planting Dates: 11 November, 2024</Text>
            <Text style={styles.detailText}>- Soil pH Requirement: 5.8-7.0</Text>
            <Text style={styles.detailText}>- Growth Duration: 90 - 120 days</Text>
            <Text style={styles.detailText}>- Planted: 1 hectare</Text>
            <Text style={styles.detailText}>- Expected Yield: 4 tons</Text>
          </View>

          <Text style={styles.sectionTitle}>TREATMENT SCHEDULES</Text>
        
        </View>

        <View style={styles.modalContent}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Enter Crop Details</Text>
                <TextInput
                  style={[styles.input, styles.inputText]}
                  placeholder="Description"
                  placeholderTextColor="white" // Set placeholder text color to white
                  value={description}
                  onChangeText={setDescription}
                />
                <TextInput
                  style={[styles.input, styles.inputText]}
                  placeholder="Amount"
                  placeholderTextColor="white" // Set placeholder text color to white
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>Add New details</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topTab: {
    width: '100%',
    backgroundColor: 'green',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100, // Ensure the content doesn't overlap with the top tab
  },
  sectionTitle: {
    fontSize: 24, // Increased font size
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
  details: {
    alignItems: 'center',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 22, // Increased font size
    color: 'black',
    textAlign: 'center',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 40,
    backgroundColor: 'gray', // Changed background color to green
    borderRadius: 20,
    padding: 50, // Increased padding
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%', // Increased width
  },
  button: {
    borderRadius: 40,
    padding: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'green',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24, // Increased font size
    fontWeight: 'bold',
  },
  input: {
    height: 50, // Increased height
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    width: 400, // Increased width
    color: 'white', // Set text color to white
  },
  inputText: {
    fontSize: 20,
  },
});

export default App;
