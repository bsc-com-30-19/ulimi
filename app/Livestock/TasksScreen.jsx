import { useState } from "react";
import { Button } from "react-native-web";
import { StyleSheet, View, Text } from "react-native";

export default function TasksScreen (){
    const [tasks, setTasks]= useState([{ key: 'Task 1'}, { key: 'Task 2'} ]);

    return (
        <View style={StyleSheet.container}>
            <Text> Tasks to complete</Text>
            <FileList 
            data={tasks}
            renderItem={({ item }) => <Text>{item.key}</Text>}/>
            <Button title="Add Task" onPress={() => {}}/>

        </View>
    );
}

/*const Styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 20,
    },
});*/