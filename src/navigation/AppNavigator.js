import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import Notification from '../components/notification';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Tableau de Bord' }} />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
