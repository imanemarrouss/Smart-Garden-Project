import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchAllLightSensorData, fetchAllHumidityTemperatureData } from '../services/NodeMCUService';

const screenWidth = Dimensions.get('window').width;

const SensorDataHistory = () => {
  const [lightSensorData, setLightSensorData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lightData = await fetchAllLightSensorData();
        setLightSensorData(lightData);

        const humidityTemperatureData = await fetchAllHumidityTemperatureData();
        const temperatures = humidityTemperatureData.map(item => item.temperature_C);
        const humidities = humidityTemperatureData.map(item => item.humidity);
        setTemperatureData(temperatures);
        setHumidityData(humidities);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };
    
    fetchData();
  }, []);

  const formatLightDataForChart = (data) => {
    const validData = data.filter(item => !isNaN(parseInt(item.value, 10)));
    return {
      labels: validData.map(item => new Date(item.timestamp).toLocaleTimeString()),
      datasets: [
        {
          data: validData.map(item => parseInt(item.value, 10)),
        }
      ]
    };
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Light Sensor Data History</Text>
        {lightSensorData.length > 0 ? (
          <LineChart
            data={formatLightDataForChart(lightSensorData)}
            width={screenWidth} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726'
              }
            }}
            bezier
            style={styles.chart}
          />
        ) : (
          <Text>No data available</Text>
        )}

        <Text style={styles.title}>Air Temperature and Humidity History</Text>
        <LineChart
          data={{
            labels: temperatureData.map((_, index) => `T${index + 1}`),
            datasets: [
              {
                data: temperatureData,
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                strokeWidth: 2,
              },
              {
                data: humidityData,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2,
              },
            ],
            legend: ["Temperature (°C)", "Humidity (%)"]
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  highlightedText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default SensorDataHistory;
