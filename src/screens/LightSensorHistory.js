import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchAllLightSensorData } from '../services/NodeMCUService';

const screenWidth = Dimensions.get('window').width;

const LightSensorHistory = () => {
  const [lightSensorData, setLightSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lightData = await fetchAllLightSensorData();
        setLightSensorData(lightData);
      } catch (error) {
        console.error('Error fetching light sensor data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDataForChart = (data) => {
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
            data={formatDataForChart(lightSensorData)}
            width={screenWidth}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
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
});

export default LightSensorHistory;
