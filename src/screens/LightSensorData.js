import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { fetchHumidityTemperatureData } from '../services/NodeMCUService';

const lightSensorData = () => {
  const screenWidth = Dimensions.get('window').width;

  const [data, setData] = useState({
    labels: ["Humidity", "Temperature (C)", "Temperature (F)"], 
    data: [0, 0, 0]
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHumidityTemperatureData().then((rawData) => {
      const parsedData = parseSensorData(rawData);
      setData(parsedData);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  const parseSensorData = (rawData) => {
    const humidityMatch = rawData.match(/Humidity: (\d+\.\d+)%/);
    const tempCMatch = rawData.match(/Temperature: (\d+\.\d+)°C/);
    const tempFMatch = rawData.match(/~ (\d+\.\d+)°F/);

    const humidity = humidityMatch ? parseFloat(humidityMatch[1]) / 100 : 0;
    const tempC = tempCMatch ? parseFloat(tempCMatch[1]) / 100 : 0;
    const tempF = tempFMatch ? parseFloat(tempFMatch[1]) / 100 : 0;

    return {
      labels: ["Humidity", "Temperature (C)", "Temperature (F)"],
      data: [humidity, tempC, tempF]
    };
  };

  // Configuration for the ProgressChart
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ProgressChart
          data={data}
          width={screenWidth}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default lightSensorData;
