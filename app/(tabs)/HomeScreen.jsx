import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity, View, Text } from "react-native";

export default function HomeScreen({ navigation }){
    return(
        <View style={styles.container}>
            <TouchableOpacity  onPress={() => navigation.goBack()} styles={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Livestock')}>
                <Text style={styles.buttonText}>Animals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Produce')}>
                <Text style={styles.buttonText}>Produce</Text>
            </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Task')}>
                <Text style={styles.buttonText}>Tasks</Text>
     
            </TouchableOpacity>

        </View>
    );

}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'Center',
        alignItems: 'center',
        backgroundColor: '#ef2e9',
    },
    button: {
        width:150,
        height: 150,
        justifyContent: 'Center',
        alignItems: 'center',
        backgroundColor: '#a5d6a7',
        borderRadius: '10',
        margin: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e7d32',
    },
});
//export default HomeScreen;