import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { fetchHumidityTemperatureData ,fetchLightSensorData,fetchHumiditySensorData} from '../services/NodeMCUService';
import { LineChart } from 'react-native-chart-kit';
import SoilScreenData from './SoilScreenData';


const AirTemperature = () => {
  const screenWidth = Dimensions.get('window').width;
  const [temperatureData, setTemperatureData] = useState({ humidity: 0, temperature_C: 0, temperature_F: 0 });

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
        
        const data = await fetchHumidityTemperatureData();
        setTemperatureData(data);

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
      data: [soilHumidity / 1024] // Assuming the soil humidity is a percentage
    };
  };

  // Configuration for the ProgressChart
  // const chartConfig = {
  //   backgroundGradientFrom: '#ff531a',
  //   backgroundGradientTo: '#ba5247',
  //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  //   strokeWidth: 2
  // };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
  };
  


  const chartSoilConfig = {
    backgroundGradientFrom: '#635e5c',
    backgroundGradientTo: '#7d6a66',
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
            {/* <ProgressChart
              data={humidityTempData}
              width={screenWidth}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
              style={styles.chart}
            /> */}
                        
                        <Text style={styles.title}>Current Light Data</Text>

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
            <Text style={styles.title}>Current Air Temperature and Humidity</Text>
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
                  <SoilScreenData />

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
  // container: {
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // chart: {
  //   marginVertical: 10, // Margin between charts
  // },
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

export default AirTemperature;

















 


