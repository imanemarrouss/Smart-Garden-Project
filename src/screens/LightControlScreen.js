import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LEDButton from '../components/ControlLed';
import SensorDataDisplay from '../components/SensorDataDisplay';
import { toggleLED, fetchLightSensorData ,activateIrrigation} from '../services/NodeMCUService';
import {  fetchHumiditySensorData, } from '../services/NodeMCUService';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LightControlScreen = ({route}) => {
    const [ledStatus, setLedStatus] = useState('OFF');
    const [lightSensorData, setLightSensorData] = useState('N/A');
    const [humiditySensorData, setHumiditySensorData] = useState('N/A');
    const { asset } = route.params;

    useEffect(() => {
      fetchLightSensorData().then((data) => setLightSensorData(data));
      fetchHumiditySensorData().then((data) => setHumiditySensorData(data)); // Fetch humidity data on component mount
    }, []);
  
    const handleToggleLED = async () => {
      try {
        await toggleLED();
        setLedStatus(ledStatus === 'OFF' ? 'ON' : 'OFF');
      } catch (error) {
        console.error('Error toggling LED:', error);
      }
    };

    const handleActivateIrrigation = async () => {
      try {
        await activateIrrigation();
        console.log('Irrigation activated');
      } catch (error) {
        console.error('Error activating irrigation:', error);
      }
    };
    
    const handleAutomaticLEDActivation = async () => {
        const currentLightValue = parseInt(lightSensorData);
        const isDark = currentLightValue < 1000; // Adjust the threshold for darkness as per your requirement
        const { asset } = route.params;
        // Check if darkness is detected or if 20 minutes have passed
        if (isDark || ledStatus === 'OFF') {
          await handleToggleLED();
        }
      };
      useEffect(() => {
        const interval = setInterval(() => {
          handleAutomaticLEDActivation();
        }, 1000); // 20 minutes in milliseconds
  
        return () => clearInterval(interval);
      }, [lightSensorData, ledStatus]);
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <Icon name="arrow-back" size={24} color="#4CAF50" onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Back to Home</Text>
      </View>
        <Image source= {{ uri: asset.uri }} style={styles.plantImage} />
        <Text style={styles.textOnImage}>{asset.title.split('.').slice(0, -1).join('.')}</Text>

        <TouchableOpacity onPress={handleToggleLED} style={styles.activateButton}>
          <Text style={styles.activateButtonText}>Toggle LED ({ledStatus})</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleActivateIrrigation} style={styles.activateButton}>
          <Text style={styles.activateButtonText}>Activate Irrigation</Text>
        </TouchableOpacity>
        {/* <SensorDataDisplay value={lightSensorData} />
        <SensorDataDisplay value={humiditySensorData} />  */}
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 10,
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#4CAF50',
  },
  plantImage: {
    width: 240,
    height: 350,
    marginBottom: 10,
    borderRadius:20,
  },
  activateButton: {
    width: 250, // Adjust button width as needed
    height: 50, // Adjust button height as needed
    marginTop: 20, // Adjust margin top to separate buttons
    backgroundColor: '#637D51',
    borderRadius: 35,
    shadowColor: '#607882',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.54,
    shadowRadius: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activateButtonText: {
    fontFamily: 'Abhaya Libre ExtraBold',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 44,
    textAlign: 'center',
    color: '#F3FFD6',
  },
  textOnImage:{
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default LightControlScreen;

