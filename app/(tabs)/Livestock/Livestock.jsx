import { useEffect, useState } from "react";
import { Button, StyleSheet, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Livestock({ navigationb}){
    const [Livestock, setLivestock] = useState([]);

    useEffect(()=>{
        const loadLivestock = async () => {
            const storeData = await AsyncStorage.getItem('Livestock');
            if (storeData) setLivestock(JSON.parse(storeData));

        };
        loadLivestock();
    }, []);
    const handleAdd = () => {
        navigationb.navigate('AddLivestock', {setLivestock});
    };
    return(
        <view style={StyleSheet.container}>
            <Flatlist data={livestock}
            KeyExtractor={(item) => item.toString()}
            renderItem={({item}) => (
                <TouchableOpacity style={StyleSheet.item}>
                    <Text> {item.name} - {item.age} years - {item.healthStatus}</Text>
                </TouchableOpacity>
            )}
            />
            <Button title="Add" onPress={handleAdd}/>
        </view>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16},
    item: { padding: 10, backgroundColor: '#e0e0e0', marginBottom: 10},
});