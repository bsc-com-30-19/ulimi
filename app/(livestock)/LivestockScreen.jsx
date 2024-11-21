
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, Button } from "react-native";
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";


export default function LivestockScreen(){
    const [animals, setAnimals] = useState([]);
    const [animalName, setAnimalName] = useState('');
    const navigation = useNavigation();

    const addAnimal =() =>{
        if (animalName.trim()){
            console.log("Adding animal: ", animalName);
            setAnimals([...animals, { key: Date.now().toString(), name: animalName}]);
            setAnimalName('');
        }else{
            console.log("Cannot be empty.");
        }
    };

    const handleAnimalPress = (animalName) => {
        navigation.navigate('LivestockDetails', {animalName, animals});
    };

    const deleteAnimal=(animalkey)=>{
        setAnimals(animals.filter((animal) => animal.key !== animalkey));
    }
     return (
        <View style={styles.container}>
            <TextInput 
            style={styles.input}
            placeholder="Enter Livestock name"
            value={animalName}
            onChangeText={setAnimalName}/>
        <Button title="Add Livestock Name" onPress={addAnimal} />
        <FlatList data={animals}
        renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleAnimalPress(item.name)}>
            <View style={styles.item}>
             <Text>{item.name}</Text>  
             <Button title="Delete" onPress={() => deleteAnimal(item.name)}/>
          </View>
        </TouchableOpacity>
     )}
/>

<TouchableOpacity style={styles.addButton} onPress={addAnimal}>
    <Text style={styles.addButtonText}>+</Text>

</TouchableOpacity>
</View>
     );
    }

 const styles = StyleSheet.create({
    container: { flex: 1, padding: 20},
    input: { height: 40, borderColor: '#ccc', borderWidth:1, marginBottom: 10, paddingLeft: 8 },
    item: { padding: 10, backgroundColor: '#e0e0e0', marginBottom: 10},
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 50,
        height: 40,
        borderRadius: 25,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }    
 });
