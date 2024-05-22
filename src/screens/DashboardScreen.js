import React from 'react';
import { View, StyleSheet ,Button} from 'react-native';
import Dashboard from '../components/Dashboard';
import TemperatureScreen from './TemperatureScreen';
import SoilScreenData from './SoilScreenData';
import LightScreen from './LightScreen';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import SensorDataHistory from './SensorDataHistory';
const DashboardScreen = () => {
  const navigation = useNavigation();

  const navigateToSensorDataHistory = () => {
    navigation.navigate('SensorDataHistory');
  };
  return (
    <View style={styles.container}>
      {/* Your existing screens */}
      <ScrollView>
        <SoilScreenData />
        <TemperatureScreen />
        <LightScreen/>
      </ScrollView>

      {/* Button to navigate to SensorDataHistory screen */}
      <View style={styles.buttonContainer}>
        <Button
          title="Check Sensor Data History"
          onPress={navigateToSensorDataHistory}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  buttonContainer: {
    marginVertical: 20,
  },
});
export default DashboardScreen;
