import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchData } from '../services/NodeMCUService';
import { database } from '../config/firebaseConfig';
import { ref, get } from 'firebase/database';

const IrrigationHistoryScreen = () => {
  const [pumpStatus, setPumpStatus] = useState('');
  const [sensorStatus, setSensorStatus] = useState('');
  const [irrigationHistory, setIrrigationHistory] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        await fetchData(setPumpStatus, setSensorStatus);

        // Fetch irrigation history from Firebase
        const irrigationHistoryRef = ref(database, 'irrigationHistory');
        const snapshot = await get(irrigationHistoryRef);
        const data = snapshot.val();

        if (data) {
          const formattedData = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setIrrigationHistory(formattedData);
        } else {
          setIrrigationHistory([]);
        }
      } catch (error) {
        console.error('Error fetching irrigation history:', error);
      }
    };

    getData();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: irrigationHistory.map(entry => new Date(entry.timestamp).toLocaleTimeString()),
    datasets: [
      {
        data: irrigationHistory.map(entry => entry.pumpStatus === 'ON' ? 1 : 0),
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // green
        strokeWidth: 2,
        label: 'Pump Status (ON=1, OFF=0)',
      },
      {
        data: irrigationHistory.map(entry => parseFloat(entry.sensorStatus)),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // purple
        strokeWidth: 2,
        label: 'Soil Sensor Data',
      },
    ],
    legend: ['Pump Status', 'Soil Sensor Data'],
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Current Pump Status: {pumpStatus}</Text>
      <Text style={styles.title}>Current Sensor Status: {sensorStatus}</Text>
      <Text style={styles.subtitle}>Irrigation History:</Text>
      
      {irrigationHistory.length > 0 ? (
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 32} // from react-native
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      ) : (
        <Text>No data available</Text>
      )}
      
      {irrigationHistory.map((entry) => (
        <View key={entry.id} style={styles.historyEntry}>
          <Text>Pump Status: {entry.pumpStatus}</Text>
          <Text>Sensor Status: {entry.sensorStatus}</Text>
          <Text>Timestamp: {new Date(entry.timestamp).toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  historyEntry: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default IrrigationHistoryScreen;
