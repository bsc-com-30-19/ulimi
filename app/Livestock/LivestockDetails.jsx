import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const LivestockDetails = ({ route, navigation }) => {
  const { animalName, animals } = route.params;
  const existingAnimal = animals.find((animal) => animal.name === animalName);

  // State for details
  const [age, setAge] = useState(existingAnimal?.age || '');
  const [breed, setBreed] = useState(existingAnimal?.breed || '');

  // Save details (Create or Update)
  const saveDetails = () => {
    /*if (!animalName || !age || !breed) {
      console.log("All fields are required.");
      return;*/
      navigation.goBack();

    };

    const updatedAnimals = animals.map((animal) =>
      animal.name === animalName ? { ...animal, age, breed } : animal
    );

    if (!existingAnimal) {
      updatedAnimals.push({ key: Date.now().toString(), name: animalName, age, breed });
    }

    console.log("Animal Details Saved:", { animalName, age, breed });
    navigation.goBack();
  

  // Delete the animal
  const deleteAnimal = () => {
    
    const updatedAnimals = animals.filter((animal) => animal.name !== animalName);
    console.log("Deleted Animal:", animalName);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name of Livestock: {animalName}</Text>

      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Breed:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter breed"
        value={breed}
        onChangeText={setBreed}
      />

      <Button title={existingAnimal ? "Save Changes" : "Create Animal"} onPress={saveDetails} />
      {existingAnimal && <Button title="Delete Animal" onPress={deleteAnimal} color="red" />}
      <Button title="Back" onPress={() => navigation.goBack()} />
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
