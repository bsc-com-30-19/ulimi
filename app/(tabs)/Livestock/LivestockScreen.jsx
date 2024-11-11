import { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";

export default function LivestockScreen(){
    const [animals, setAnimals] = useState([]);
    const [animalName, setAnimalName] = useState('');

    const addAnimal =() =>{
        if (animalName.trim()){
            setAnimals([...animals, { key: animalName}]);
            setAnimalName('');
        }
    };
     return (
        <View style={styles.container}><TextInput style={styles.input}
        placeholder="Enter animal name"
        value={animalName}
        onChangeText={setAnimalName}/>
        <Button title="Add Animal" onPress={addAnimal}/>
        <FlatList data={animals}
        renderItem={({ item }) => <Text>{item.key}</Text>}/>
        </View>
    );
}
 const styles = StyleSheet.create({
    container: { flex: 1, padding: 20},
    item: { padding: 10, backgroundColor: '#e0e0e0', marginBottom: 10},
 });
