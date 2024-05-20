import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchAllLightSensorData } from '../services/NodeMCUService';

const SensorDataHistory = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllLightSensorData();
        setSensorData(data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };
    
    fetchData();
  }, []);

  const formatDataForChart = (data) => {
    return {
      labels: data.map(item => new Date(item.timestamp).toLocaleTimeString()),
      datasets: [
        {
          data: data.map(item => parseInt(item.value, 10)),
        }
      ]
    };
  };

  return (
    <ScrollView>
      <View>
        {sensorData.length > 0 ? (
          <LineChart
            data={formatDataForChart(sensorData)}
            width={Dimensions.get('window').width} // from react-native
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
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        ) : (
          <Text>No data available</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default SensorDataHistory;
