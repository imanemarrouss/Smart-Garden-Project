import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { fetchHumiditySensorData } from '../services/NodeMCUService';

const SoilScreenData = () => {
  const screenWidth = Dimensions.get('window').width;
  const [soilHumidityData, setSoilHumidityData] = useState({
    labels: ["Soil Humidity"],
    data: [0]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const humidity = await fetchHumiditySensorData();
        setSoilHumidityData({
          labels: ["Soil Humidity"],
          data: [humidity / 1024] // Adjust to your data scaling
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
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
            <Text style={styles.title}>Current Soil Humidity</Text>
            <ProgressChart
              data={soilHumidityData}
              width={screenWidth}
              height={220}
              strokeWidth={26}
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
    paddingBottom: 20,
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

export default SoilScreenData;
