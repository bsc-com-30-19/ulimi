import { useNavigation } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default function ProduceScreen(){
    const [Produce, setProduce] = useState([]);
    const [ProduceName, setProduceName] = useState('');
    const navigation = useNavigation();

    const addProduce =() =>{
        if (ProduceName.trim()){
            setProduce([...Produce, { key: ProduceName}]);
            setProduceName('');
        }
    };

    const handleProducePress = (ProduceName) => {
        navigation.navigate('ProduceDetails', {ProduceName});
    };
     return (
        <View style={styles.container}><TextInput style={styles.input}
        placeholder="Enter Type of produce "
        value={ProduceName}
        onChangeText={setProduceName}/>
        <FlatList data={Produce}
        renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleProducePress(item.key)}>
            <View style={styles.item}>
             <Text>{item.key}</Text>  
          </View>
        </TouchableOpacity>
     )}
/>

<TouchableOpacity style={styles.addButton} onPress={addProduce}>
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
