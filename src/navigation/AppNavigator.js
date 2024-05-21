import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';

import Notification from '../components/notification';
import { PlantInfo } from '../screens/planInfo';
import { PlantDetails } from '../screens/PlantDetails';
import { AllPlants } from '../screens/AllPlants';
import LightControlScreen from '../screens/LightControlScreen';
import LightHumidityGraphScreen from '../screens/LightHumidityGraphScreen';
import AirTemperature from '../screens/AirTemperature';
import SensorDataHistory from '../screens/SensorDataHistory';
import TemperatureScreen from '../screens/TemperatureScreen';
import IrrigationHistoryScreen from '../screens/IrrigationHistoryScreen';
import SoilScreenData from '../screens/SoilScreenData';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="allPlant" component={AllPlants} />
      <Stack.Screen name="PlantDetails" component={PlantDetails} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Tableau de Bord' }} />
        <Stack.Screen name="Notification" component={Notification} />
      {/* <Stack.Screen name="AirTemperature" component={AirTemperature} options={{ title: 'Tableau de Bord' }} /> */}
      {/* <Stack.Screen name="SoilScreenData" component={SoilScreenData} options={{ title: 'Tableau de Bord' }} /> */}
      {/* <Stack.Screen name="TemperatureScreen" component={TemperatureScreen} options={{ title: 'Tableau de Bord' }} /> */}
      {/* <Stack.Screen name="SensorDataHistory" component={SensorDataHistory} options={{ title: 'Tableau de Bord' }} /> */}
      {/* <Stack.Screen name="IrrigationHistoryScreen" component={IrrigationHistoryScreen} options={{ title: 'Tableau de Bord' }} /> */}

                {/* <Stack.Screen name="LightControl" component={LightControlScreen} options={{ title: 'Tableau de Bord' }} /> */}
                <Stack.Screen name="Notification" component={Notification} />
        {/* <Stack.Screen name="LightHumidityGraphScreen" component={LightHumidityGraphScreen} options={{ title: 'Tableau de Bord' }} /> */}
        {/* <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Tableau de Bord' }} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
