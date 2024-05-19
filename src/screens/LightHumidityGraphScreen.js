import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import { fetchLightSensorData, fetchHumiditySensorData, fetchHumidityTemperatureData } from '../services/NodeMCUService';

const screenWidth = Dimensions.get('window').width;

const LightHumidityGraphScreen = () => {
  const [lightSensorData, setLightSensorData] = useState('N/A');
  const [humiditySensorData, setHumiditySensorData] = useState('N/A');
  const [temperatureSensorData, setTemperatureSensorData] = useState('N/A');

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchLightSensorData().then((data) => setLightSensorData(data));
        fetchHumiditySensorData().then((data) => setHumiditySensorData(data));
        fetchHumidityTemperatureData().then((data) => setTemperatureSensorData(data));

        console.log('Fetched Light Data:', lightData);
        console.log('Fetched Humidity Data:', humidityData);
        console.log('Fetched Temperature Data:', temperatureData);

        setLightSensorData(lightData);
            setHumiditySensorData(humidityData);
            setTemperatureSensorData(temperatureData);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const normalizedLightValue = (lightSensorData / 1024) ;


  // Get the latest values
  const latestLightValue = lightSensorData[lightSensorData.length - 1];
  const latestHumidityValue = humiditySensorData[humiditySensorData.length - 1];
  const latestTemperatureValue = temperatureSensorData[temperatureSensorData.length - 1];

  // Log values for debugging
  console.log('Latest Light Value:', latestLightValue);

  // Normalize values for progress charts
  const normalizedHumidityValue = latestHumidityValue / 100;
  const normalizedTemperatureValue = latestTemperatureValue / 100; // Assuming temperature is in a scale from 0 to 100

  const lightChartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    },
    yAxisSuffix: "",
    yAxisInterval: 1,
  };

  const humidityChartConfig = {
    backgroundGradientFrom: "#000000",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#000000",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#39614d"
    },
    yAxisSuffix: "",
    yAxisInterval: 1,
  };

  const temperatureChartConfig = {
    backgroundGradientFrom: "#ff6600",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ff6600",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    },
    yAxisSuffix: "",
    yAxisInterval: 1,
  };

  const lightData = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        data: lightSensorData,
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Light Intensity"]
  };

  const humidityData = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        data: humiditySensorData,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Humidity Levels"]
  };

  const temperatureData = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        data: temperatureSensorData,
        color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Temperature"]
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Sensor Data</Text>

      <View style={styles.progressContainer}>
        <Text style={styles.graphTitle}>Current Light Intensity</Text>
        <ProgressChart
          data={{
            labels: ["Light"],
            data: [normalizedLightValue]
          }}
          width={screenWidth - 30}
          height={220}
          chartConfig={lightChartConfig}
          style={styles.graphStyle}
        />
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.graphTitle}>Current Humidity</Text>
        <ProgressChart
          data={{
            labels: ["Humidity"],
            data: [humiditySensorData]
          }}
          width={screenWidth - 30}
          height={220}
          chartConfig={humidityChartConfig}
          style={styles.graphStyle}
        />
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.graphTitle}>Current Temperature</Text>
        <ProgressChart
          data={{
            labels: ["Temperature"],
            data: [temperatureSensorData]
          }}
          width={screenWidth - 30}
          height={220}
          chartConfig={temperatureChartConfig}
          style={styles.graphStyle}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  graphStyle: {
    borderRadius: 16,
    marginVertical: 8,
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default LightHumidityGraphScreen;
