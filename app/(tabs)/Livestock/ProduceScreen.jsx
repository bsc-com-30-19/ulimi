import { Button } from "react-native";
import { StyleSheet,View } from "react-native";
import { Text } from "react-native";

export default function ProduceScreen(){
    return(
        <View style={Styles.container}>
            <Text>Produce Records</Text>
            <Button title="Filter" onPress={() => {}}/>

        </View>

    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});