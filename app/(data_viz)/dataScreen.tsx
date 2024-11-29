import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import axios from 'axios';

interface Crop {
  id: number;
  name: string;
  date_planted: string;
  expected_yield_date: string;
}

interface Finance {
  id: number;
  type: string;
  amount: string;
  date: string;
}

export default function DataScreen(): JSX.Element {
  const [cropData, setCropData] = useState<Crop[]>([]);
  const [financeData, setFinanceData] = useState<Finance[]>([]);
  const [loadingCrops, setLoadingCrops] = useState(true);
  const [loadingFinance, setLoadingFinance] = useState(true);

  useEffect(() => {
    // Fetch crop data
    axios
      .get<Crop[]>('https://kazoomarc.pythonanywhere.com/api/crops/')
      .then((response) => setCropData(response.data))
      .catch((error) => console.error('Error fetching crop data:', error))
      .finally(() => setLoadingCrops(false));

    // Fetch financial data
    axios
      .get<Finance[]>('https://kazoomarc.pythonanywhere.com/api/finances/')
      .then((response) => setFinanceData(response.data))
      .catch((error) => console.error('Error fetching financial data:', error))
      .finally(() => setLoadingFinance(false));
  }, []);

  // Prepare crop data for the bar chart
  const cropNames = cropData.map((item) => item.name);
  const durations = cropData.map((item) => {
    const planted = new Date(item.date_planted);
    const yieldDate = new Date(item.expected_yield_date);
    return (yieldDate.getTime() - planted.getTime()) / (1000 * 60 * 60 * 24); // Duration in days
  });

  // Prepare financial data for the line chart
  const financeDates = financeData.map((item) =>
    new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  );
  const financeAmounts = financeData.map((item) => parseFloat(item.amount));

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Crop Data Visualization */}
        <Text style={styles.title}>Crop Timeline</Text>
        {loadingCrops ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <BarChart
            data={{
              labels: cropNames,
              datasets: [
                {
                  data: durations,
                },
              ],
            }}
            width={320}
            height={220}
            fromZero
            yAxisLabel=""
            yAxisSuffix=" days"
            chartConfig={{
              backgroundColor: '#f3f3f3',
              backgroundGradientFrom: '#e3e3e3',
              backgroundGradientTo: '#ffffff',
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              barPercentage: 0.5,
            }}
            verticalLabelRotation={30}
          />
        )}

        {/* Financial Data Visualization */}
        <Text style={styles.title}>Financial Overview</Text>
        {loadingFinance ? (
          <ActivityIndicator size="large" color="#FF9800" />
        ) : (
          <LineChart
            data={{
              labels: financeDates,
              datasets: [
                {
                  data: financeAmounts,
                  strokeWidth: 2,
                },
              ],
            }}
            width={320}
            height={220}
            chartConfig={{
              backgroundColor: '#f9f9f9',
              backgroundGradientFrom: '#ffa726',
              backgroundGradientTo: '#fb8c00',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 20,
  },
});
