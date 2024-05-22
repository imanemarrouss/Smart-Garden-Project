import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native'; // Importez Text depuis 'react-native'
import CameraView from './CameraView';

const AddPlants = () => {
  const [plantName, setPlantName] = useState('');
  const [plantSCName, setPlantSCName] = useState('');
  const [showCamera, setShowCamera] = useState(false);

  const handleCameraPress = () => {
    setShowCamera(true);
  };

  const handleAlert = () => {
    Alert.alert('Success', 'The plant has been created successfully!');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Plant Name"
        value={plantName}
        onChangeText={setPlantName}
      />
      <TextInput
        style={styles.input}
        placeholder="Add Scientific name "
        value={plantName}
        onChangeText={setPlantSCName}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleCameraPress}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAlert}>
        <Text style={styles.buttonText}>Create Plant</Text>
      </TouchableOpacity>
      {showCamera && <CameraView style={styles.cam} imageName={plantName}  />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor:'green',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  cam: {
    paddingRight:70
  }
});

export default AddPlants;
