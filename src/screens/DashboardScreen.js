import React from 'react';
import { View, StyleSheet } from 'react-native';
import Dashboard from '../components/Dashboard';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Dashboard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default DashboardScreen;
