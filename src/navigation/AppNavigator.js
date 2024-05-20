import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import LightControlScreen from '../screens/LightControlScreen';
import Notification from '../components/notification';
import LightHumidityGraphScreen from '../screens/LightHumidityGraphScreen';
import AirTemperature from '../screens/AirTemperature';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      
      <Stack.Screen name="AirTemperature" component={AirTemperature} options={{ title: 'Tableau de Bord' }} />

                {/* <Stack.Screen name="LightControl" component={LightControlScreen} options={{ title: 'Tableau de Bord' }} /> */}
                {/* <Stack.Screen name="Notification" component={Notification} /> */}
        {/* <Stack.Screen name="LightHumidityGraphScreen" component={LightHumidityGraphScreen} options={{ title: 'Tableau de Bord' }} /> */}
        {/* <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Tableau de Bord' }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
