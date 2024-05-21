import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchHumidityTemperatureData } from '../services/NodeMCUService';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
};

const TemperatureScreen = () => {
  const [temperatureData, setTemperatureData] = useState({ humidity: 0, temperature_C: 0, temperature_F: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHumidityTemperatureData();
        setTemperatureData(data);
      } catch (error) {
        console.error('Error fetching temperature data:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temperature and Humidity</Text>
      <LineChart
        data={{
          labels: ['Temperature', 'Humidity'],
          datasets: [
            {
              data: [temperatureData.temperature_C, temperatureData.humidity],
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        }}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default TemperatureScreen;
