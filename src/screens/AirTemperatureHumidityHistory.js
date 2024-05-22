import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchAllHumidityTemperatureData } from '../services/NodeMCUService';

const screenWidth = Dimensions.get('window').width;

const AirTemperatureHumidityHistory = () => {
  const [temperatureHumidityData, setTemperatureHumidityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const humidityTemperatureData = await fetchAllHumidityTemperatureData();
        setTemperatureHumidityData(humidityTemperatureData);
      } catch (error) {
        console.error('Error fetching humidity and temperature data:', error);
      }
    };

    fetchData();
  }, []);

  // Extracting timestamps, temperatures, and humidities from data for chart
  const chartData = {
    labels: temperatureHumidityData.map(item => item.timestamp),
    datasets: [
      {
        data: temperatureHumidityData.map(item => item.temperature_C),
        color: (opacity = 1) => `rgba(189, 72, 51, ${opacity})`, // Line color
        strokeWidth: 2, // Line width
      },
      {
        data: temperatureHumidityData.map(item => item.humidity),
        color: (opacity = 1) => `rgba(30, 144, 255, ${opacity})`, // Line color
        strokeWidth: 2, // Line width
      },
    ],
    legend: ['Temperature (°C)', 'Humidity (%)'],
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Air Temperature and Humidity History</Text>
        {temperatureHumidityData.length > 0 ? (
          <LineChart
            data={chartData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            bezier
          />
        ) : (
          <Text style={styles.noDataText}>No data available</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataText: {
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
});

// Chart configuration
const chartConfig = {
  backgroundGradientFrom: '#f0f0f0',
  backgroundGradientTo: '#f0f0f0',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Line color
  strokeWidth: 2, // Line width
  barPercentage: 0.5,
};

export default AirTemperatureHumidityHistory;
