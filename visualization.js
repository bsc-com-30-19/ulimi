import React from 'react';
import { View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const ExpenseChart = ({ data }) => {
    const chartData = data.map((item) => ({
        name: item.category,
        amount: item.amount,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Random color
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }));

    return (
        <View>
            <PieChart
                data={chartData}
                width={Dimensions.get('window').width - 20}
                height={220}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: { borderRadius: 16 }
                }}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
        </View>
    );
};

export default ExpenseChart;
