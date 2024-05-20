import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { fetchHumidityTemperatureData ,fetchLightSensorData,fetchHumiditySensorData} from '../services/NodeMCUService';

const AirTemperature = () => {
  const screenWidth = Dimensions.get('window').width;

  const [soilHumidityData, setSoilHumidityData] = useState({
    labels: ["Soil Humidity"],
    data: [0]
  });

  const [humidityTempData, setHumidityTempData] = useState({
    labels: ["Humidity", "Temperature (C)", "Temperature (F)"],
    data: [0, 0, 0]
  });

  const [lightData, setLightData] = useState({
    labels: ["Light Intensity"],
    data: [0]
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawHumidityTempData = await fetchHumidityTemperatureData();
        const parsedHumidityTempData = parseSensorData(rawHumidityTempData);
        setHumidityTempData(parsedHumidityTempData);

        const rawLightData = await fetchLightSensorData();
        const parsedLightData = parseLightSensorData(rawLightData);
        setLightData(parsedLightData);

        const rawSoilHumidityData = await fetchHumiditySensorData();
        const parsedSoilHumidityData = parseSoilHumidityData(rawSoilHumidityData);
        setSoilHumidityData(parsedSoilHumidityData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
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

  const parseLightSensorData = (rawData) => {
    const lightIntensity = parseFloat(rawData);
    return {
      labels: ["Light Intensity"],
      data: [lightIntensity / 1024] // Assuming the light intensity is a percentage
    };
  };

  const parseSoilHumidityData = (rawData) => {
    const soilHumidity = parseFloat(rawData);
    return {
      labels: ["Soil Humidity"],
      data: [soilHumidity / 100] // Assuming the soil humidity is a percentage
    };
  };

  // Configuration for the ProgressChart
  const chartConfig = {
    backgroundGradientFrom: '#ba5247',
    backgroundGradientTo: '#59504f',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2
  };
  const chartSoilConfig = {
    backgroundGradientFrom: '#544c38',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2
  };


  const chartLightConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <ProgressChart
              data={humidityTempData}
              width={screenWidth}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
              style={styles.chart}
            />
            <ProgressChart
              data={soilHumidityData}
              width={screenWidth}
              height={220}
              strokeWidth={26}
              radius={62}
              chartConfig={chartSoilConfig}
              hideLegend={false}
              style={styles.chart}
            />
            <ProgressChart
              data={lightData}
              width={screenWidth}
              height={220}
              strokeWidth={16}
              radius={62}
              chartConfig={chartLightConfig}
              hideLegend={false}
              style={styles.chart}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20, // Margin at the bottom
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  chart: {
    marginVertical: 10, // Margin between charts
  }
});

export default AirTemperature;
