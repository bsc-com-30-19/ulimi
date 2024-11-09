import React, { useState } from "react";
import { TextInput, view, Text, Button, StyleSheet } from "react-native-gesture-handler";
//import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddLivestock({ navigation, route }){
    const { setLivestock } = route.params;
    const [name, setName] = useState('');
    const [age, setAge] =useState('');
    const [healthStatus, setHealthStatus] = useState('');

    const saveLivestock = async () => {
        const newLivestock = { id: Date.now(), name, age, healthStatus};
        const StoreData = await AsyncStorage.getItem('livestock');
        const updateLivestock= [...currentLivestock, newLivestock];

        await AsyncStorage.setItem('livestock', JSON.stringify(updateLivestock));
        setLivestock(updateLivestock);

    };
    return (
        <view style={StyleSheet.container}>
            <Text>Name:</Text>
            <TextInput style={StyleSheet.input} value={name} onChangeText={setName} placeholder="Enter name"></TextInput>
            <Text>Age:</Text>
            <TextInput style={StyleSheet.input} value={age} onChangeText={setAge} placeholder="Enter age"></TextInput>
            <Text>HealthStatus:</Text>
            <TextInput style={StyleSheet.input} value={healthStatus} onChangeText={setHealthStatus} placeholder="Enter healthStatus"></TextInput>
            <Button tittle="Save" onPress={saveLivestock}/>
        </view>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16},
    input: { height: 40, borderColor: 'gray',
        borderWidth: 1, 
        marginBottom: 12,
        padding: 8
    },
})