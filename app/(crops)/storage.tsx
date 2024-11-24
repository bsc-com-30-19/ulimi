import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, Pressable, View, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cropName, setCropName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.topTab}>
          <Text style={styles.tabText}>STORAGE</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Component Name</Text>
            <Text style={styles.tableHeaderText}>Date of storing</Text>
            <Text style={styles.tableHeaderText}>Amount of Yield</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableText}>Maize</Text>
            <Text style={styles.tableText}>11/11/2024</Text>
            <Text style={styles.tableText}>4000 kg</Text>
          </View>
          {/* Add more table rows as needed */}
        </ScrollView>

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
                <Text style={styles.modalText}>Add Harvest</Text>
                <TextInput
                  style={[styles.input, styles.inputText]}
                  placeholder="CROP NAME"
                  placeholderTextColor="white" // Set placeholder text color to white
                  value={cropName}
                  onChangeText={setCropName}
                />
                <TextInput
                  style={[styles.input, styles.inputText]}
                  placeholder="DATE"
                  placeholderTextColor="white" // Set placeholder text color to white
                  value={date}
                  onChangeText={setDate}
                />
                <TextInput
                  style={[styles.input, styles.inputText]}
                  placeholder="AMOUNT OF YIELD"
                  placeholderTextColor="white" // Set placeholder text color to white
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Add</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>Add storage details</Text>
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
    marginTop: 10, // Adjust top margin
    paddingHorizontal: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#f1f1f1',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  tableText: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
  },
  modalContent: {
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
    backgroundColor: 'gray', // Changed background color to grey
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
