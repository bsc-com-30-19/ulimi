const GoalForm = ({ onSubmit }) => {
    const [targetAmount, setTargetAmount] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = () => {
        if (!targetAmount || !dueDate) {
            Alert.alert("Error", "Please fill in all required fields");
            return;
        }

        const goal = {
            targetAmount: parseFloat(targetAmount),
            description,
            dueDate,
            currentAmount: 0,
            status: 'in_progress'
        };

        onSubmit(goal);
    };

    return (
        <View>
            <Text>Target Amount:</Text>
            <TextInput value={targetAmount} onChangeText={setTargetAmount} keyboardType="numeric" placeholder="Amount to save" />

            <Text>Description:</Text>
            <TextInput value={description} onChangeText={setDescription} placeholder="Goal description" />

            <Text>Due Date:</Text>
            <TextInput value={dueDate} onChangeText={setDueDate} placeholder="YYYY-MM-DD" />

            <Button title="Set Goal" onPress={handleSubmit} />
        </View>
    );
};

export default GoalForm;
