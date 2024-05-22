import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { fetchLightSensorData } from '../services/NodeMCUService';

const LightScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const [lightData, setLightData] = useState({
    labels: ["Light Intensity"],
    data: [0]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawLightData = await fetchLightSensorData();
        const parsedLightData = parseLightSensorData(rawLightData);
        setLightData(parsedLightData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseLightSensorData = (rawData) => {
    const lightIntensity = parseFloat(rawData);
    return {
      labels: ["Light Intensity"],
      data: [lightIntensity / 1024] // Assuming the light intensity is a percentage
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
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Text style={styles.title}>Current Light Data</Text>
            <ProgressChart
              data={lightData}
              width={screenWidth}
              height={220}
              strokeWidth={16}
              radius={62}
              chartConfig={chartConfig}
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

export default LightScreen;
