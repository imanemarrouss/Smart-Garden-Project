
import { database } from '../config/firebaseConfig';
import { ref, push, set } from 'firebase/database';
import {  get } from 'firebase/database';

const BASE_URL = 'http://192.168.1.30';

export const toggleLED = async () => {
  const response = await fetch(`${BASE_URL}/toggle`);
  if (!response.ok) {
    throw new Error('Failed to toggle LED');
  }
};

// export const fetchLightSensorData = async () => {
//   const response = await fetch(`${BASE_URL}/lightSensorData`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch light sensor data');
//   }
//   return await response.text();
// };


export const fetchLightSensorData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/lightSensorData`);
    const data = await response.text();
    console.log('Fetched Light Sensor Data:', data);
    
    // Save data to Firebase Realtime Database
    await push(ref(database, 'lightSensorData'), {
      value: data,
      timestamp: new Date().toISOString(),
    });

    return [data]; // Assuming the data is a single value, return it in an array
  } catch (error) {
    console.error('Error fetching light sensor data:', error);
    return [0]; // Return [0] in case of error to avoid breaking the app
  }
};

// export const fetchLightSensorData = async () => {
//   try {
//     const response = await fetch('http://192.168.1.30/lightSensorData');
//     const data = await response.text();
//     console.log('Fetched Light Sensor Data:', data);
//     return [data]; // Assuming the data is a single value, return it in an array
//   } catch (error) {
//     console.error('Error fetching light sensor data:', error);
//     return [0]; // Return [0] in case of error to avoid breaking the app
//   }
// };


// export const fetchLightSensorData = async () => {
//   try {
//     const response = await fetch('http://192.168.1.30/lightSensorData');
//     const data = await response.text();
//     console.log('Fetched Light Sensor Data:', data);
    
//     // Save the retrieved data to Firebase
//     await db.ref('sensor/light').set(data);

//     return [data]; // Assuming the data is a single value, return it in an array
//   } catch (error) {
//     console.error('Error fetching light sensor data:', error);
//     return [0]; // Return [0] in case of error to avoid breaking the app
//   }
// };


export const fetchHumidityTemperatureData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/temperatureHumidityData`);
    const data = await response.text();
    console.log('Fetched Humidity and Temperature Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching humidity and temperature data:', error);
    return { humidity: 0, temperature_C: 0, temperature_F: 0 };
  }
};


export const activateIrrigation = async () => {
  const response = await fetch(`${BASE_URL}/activateIrrigation`);
  if (!response.ok) {
    throw new Error('Failed to activate irrigation');
  }
};

export const fetchHumiditySensorData = async () => {
  const response = await fetch(`${BASE_URL}/humiditySensorData`);
  if (!response.ok) {
    throw new Error('Failed to fetch humidity sensor data');
  }
  return await response.text();
};

export const fetchData = async (setPumpStatus, setSensorStatus) => {
  try {
    const pumpResponse = await fetch(`${BASE_URL}/pumpState`);
    if (!pumpResponse.ok) {
      throw new Error('Failed to fetch pump state');
    }
    const pumpData = await pumpResponse.text();
    setPumpStatus(pumpData);

    const sensorResponse = await fetch(`${BASE_URL}/sensorStatus`);
    if (!sensorResponse.ok) {
      throw new Error('Failed to fetch sensor status');
    }
    const sensorData = await sensorResponse.text();
    setSensorStatus(sensorData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Add this function in your NodeMCUService.js or appropriate service file
export const fetchTemperatureSensorData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/temperatureSensorData`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching temperature sensor data:', error);
    return [0, 0, 0, 0, 0, 0, 0];
  }
};

export const fetchAllLightSensorData = async () => {
  try {
    const lightSensorDataRef = ref(database, 'lightSensorData');
    const snapshot = await get(lightSensorDataRef);
    const data = snapshot.val();

    if (data) {
      const formattedData = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      console.log('All Light Sensor Data:', formattedData);
      return formattedData;
    } else {
      console.log('No data available');
      return [];
    }
  } catch (error) {
    console.error('Error fetching light sensor data:', error);
    throw error;
  }
};