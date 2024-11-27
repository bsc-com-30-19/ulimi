import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";

export default function DataScreen() {
  const data = [
    { name: "Maize", population: 35, color: "#4CAF50", legendFontColor: "#000", legendFontSize: 15 },
    { name: "Rice", population: 40, color: "#FF9800", legendFontColor: "#000", legendFontSize: 15 },
    { name: "Beans", population: 25, color: "#03A9F4", legendFontColor: "#000", legendFontSize: 15 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Harvest Data</Text>
      <PieChart
        data={data}
        width={320}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 2,
          barPercentage: 0.5,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
});
