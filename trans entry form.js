import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const TransactionForm = ({ onSubmit }) => {
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (!type || !category || !amount) {
            Alert.alert("Error", "Please fill in all required fields");
            return;
        }

        const transaction = {
            type,
            category,
            amount: parseFloat(amount),
            description,
            date: new Date().toISOString().split('T')[0]
        };

        onSubmit(transaction); // Callback to send data to database
    };

    return (
        <View>
            <Text>Type (Income/Expense):</Text>
            <TextInput value={type} onChangeText={setType} placeholder="Income or Expense" />

            <Text>Category:</Text>
            <TextInput value={category} onChangeText={setCategory} placeholder="e.g., Sales, Feed" />

            <Text>Amount:</Text>
            <TextInput value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="Amount" />

            <Text>Description:</Text>
            <TextInput value={description} onChangeText={setDescription} placeholder="Optional Description" />

            <Button title="Submit Transaction" onPress={handleSubmit} />
        </View>
    );
};

export default TransactionForm;
