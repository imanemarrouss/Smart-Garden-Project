import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import Svg, { Path, ClipPath, Defs, Rect, LinearGradient, Stop } from 'react-native-svg';

export  const PlantInfo = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/icon.png')} // Remplacez par votre image de fond
        style={styles.rectangle1}
        imageStyle={{ opacity: 0.84 }}
      />
      
      <View style={styles.group3} />

      <Text style={styles.backToHom}>
        back to home
      </Text>
      
      <Text style={styles.bromeliadF}>
        Bromeliad Fiest
      </Text>
      
      <Text style={styles.scientific}>
        Scientific name Aechmea Fasciata
      </Text>
      
      <Text style={styles.name}>
        Name
      </Text>
      
      <ImageBackground
        source={require('../../assets/icon.png')} // Remplacez par votre image de fond
        style={styles.rectangle2}
      />
      
      
      
      <Text style={styles.bromeliadF}>
        BromeliFiesta 
      </Text>
       <Text style={styles.easy}>
        Easy
      </Text>
      
      <Text style={styles.moderateLi}>
        Moderate light
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  rectangle1: {
    position: 'absolute',
    top: -50,
    left: 0,
    width: 428,
    height: 100,
  },
  group3: {
    top: 12,
    left: 33,
    width: 362,
    height: 362,
  },
  backToHom: {
    position: 'absolute',
    top: 28,
    left: 54,
    width: 104,
    height: 44,
    color: '#D0DDB4',
    fontSize: 18,
    lineHeight: 44,
    textAlign: 'center',
  },
  bromeliadF: {
    position: 'absolute',
    top: 120,
    left: 34,
    width: 214,
    height: 44,
    color: '#4F6066',
    fontSize: 30,
    lineHeight: 44,
    textAlign: 'top',
  },
  scientific: {
    position: 'absolute',
    top: 122,
    left: 34,
    width: 198,
    height: 36,
    color: '#779AA5',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
  },
  name: {
    position: 'absolute',
    top: 130,
    left: 34,
    width: 34,
    height: 18,
    color: '#4F6066',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'top',
  },
  rectangle2: {
    position: 'absolute',
    top: 60,
    left: 60,
    width: 250,
    height: 250,
  },
  vector51: {
    position: 'absolute',
    top: 42,
    left: 34,
  },
  vector52: {
    position: 'absolute',
    top: 755.5,
    left: 361.5,
  },
  easy: {
    position: 'absolute',
    top: 573,
    left: 65,
    width: 24,
    height: 18,
    color: '#779AA5',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  moderateLi: {
    position: 'absolute',
    top: 573,
    left: 150,
    width: 75,
    height: 18,
    color: '#779AA5',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
});

