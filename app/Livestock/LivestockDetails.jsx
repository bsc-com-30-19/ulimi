import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const LivestockDetails = ({  navigation }) => {
 /* const { animalName, animals } = route.params;
  //const existingAnimal = animals.find((animal) => animal.name === animalName);

  // State for details
  //const [age, setAge] = useState(existingAnimal?.age || '');
  //const [breed, setBreed] = useState(existingAnimal?.breed || '');

  // Save details (Create or Update)
  //const saveDetails = () => {
    /*if (!animalName || !age || !breed) {
      console.log("All fields are required.");
      return;*/
     // navigation.goBack();

   // };

    //const updatedAnimals = animals.map((animal) =>
    //  animal.name === animalName ? { ...animal, age, breed } : animal
   // );

    //if (!existingAnimal) {
      //updatedAnimals.push({ key: Date.now().toString(), name: animalName, age, breed });
    //}

    //console.log("Animal Details Saved:", { animalName, age, breed });
    //navigation.goBack();
  

  // Delete the animal
  //const deleteAnimal = () => {
    
    //const updatedAnimals = animals.filter((animal) => animal.name !== animalName);
   // console.log("Deleted Animal:", animalName);
    //navigation.goBack(); }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Livestock</Text>
<View style={styles.grid} >
  <TouchableOpacity
    style={styles.button}
    onPress={() => navigation.navigate('Cattle')} >
      <Text style={styles.buttonText}>Cattle</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.button}
    onPress={() => navigation.navigate('Goats')} >
      <Text style={styles.buttonText}>Goats</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.button}
    onPress={() => navigation.navigate('ChICKEN')} >
      <Text style={styles.buttonText}>Chicken</Text>
  </TouchableOpacity>
  <TouchableOpacity

    style={styles.button}
    onPress={() => navigation.navigate('Sheep')} >
      <Text style={styles.buttonText}>Sheep</Text>
  </TouchableOpacity>
  </View>
  </View>
  );


};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, marginBottom: 20 },
  label: { fontSize: 18, marginVertical: 10 },
  input: { height: 40, width: '80%', borderColor: '#ccc', borderWidth: 1, marginBottom: 20, paddingLeft: 8 },
 });


export default LivestockDetails;
