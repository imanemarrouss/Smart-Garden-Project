import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import LightControlScreen from '../screens/LightControlScreen';
import Notification from '../components/notification';
import LightHumidityGraphScreen from '../screens/LightHumidityGraphScreen';
import AirTemperature from '../screens/AirTemperature';
import SensorDataHistory from '../screens/SensorDataHistory';
import TemperatureScreen from '../screens/TemperatureScreen';
import IrrigationHistoryScreen from '../screens/IrrigationHistoryScreen';
import SoilScreenData from '../screens/SoilScreenData';
import LightScreen from '../screens/LightScreen';
import LightSensorHistory from '../screens/LightSensorHistory';
import SoilHumidityHistory from '../screens/SoilHumidityHistory';
import AirTemperatureHumidityHistory from '../screens/AirTemperatureHumidityHistory';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      

      <Stack.Screen name="SensorDataHistory" component={SensorDataHistory} options={{ title: 'Tableau de Bord' }} />
      {/* <Stack.Screen name="IrrigationHistoryScreen" component={IrrigationHistoryScreen} options={{ title: 'Tableau de Bord' }} /> */}



                {/* <Stack.Screen name="LightControl" component={LightControlScreen} options={{ title: 'Tableau de Bord' }} /> */}
                {/* <Stack.Screen name="Notification" component={Notification} /> */}
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Tableau de Bord' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
