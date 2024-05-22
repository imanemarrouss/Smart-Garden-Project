import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Dimensions, Platform, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import useAlbumFetcher from '../components/AlbumFetcher';
import AddPlants from './AddPlants';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;

export function AllPlants() {
  const albumAssets = useAlbumFetcher('Plants');
  const navigation = useNavigation();


const renderItem = ({ item }) => (
    <AlbumEntry asset={item} navigation={navigation} />
  );

  const renderFooter = () => (
    <TouchableOpacity onPress={() => navigation.navigate('AddPlants')}>
      <Image source={require('../../assets/addPlantIcon.png')} style={styles.imageFooter} />
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
       data={albumAssets}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.albumAssetsContainer}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

function AlbumEntry({ asset, navigation }) {
  return (
    <View style={styles.imageBack}>
      <TouchableOpacity onPress={() => navigation.navigate('LightControl', { asset })}>
        <Image source={{ uri: asset.uri }} style={styles.image} />
        <View style={styles.innerShadow} />
        <Text style={styles.textOnImage}>{asset.title.split('.').slice(0, -1).join('.')}</Text>
      </TouchableOpacity>
      
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
    ...Platform.select({
      android: {
        paddingTop: 32
      }
    }),
  },
  image: {
    width: screenWidth / numColumns - 20,
    height: screenWidth / numColumns - 10,
    borderRadius: 20,
  },
    imageBack: {
    width: screenWidth / numColumns - 15,
    height: screenWidth / numColumns - 10,
    margin: 4,
   
    borderRadius:20,
    marginLeft:11,
    shadowColor: '#fffff',
    shadowOffset: { width: 2, height: 35 },
    shadowOpacity: 0.1,
    shadowRadius: 0.27,
    elevation: 2, 
  
  },
  albumAssetsContainer: {
    gap: 4,
  },
 
  innerShadow: {
    position: 'absolute',
    height:screenWidth / numColumns - 140,
    width: screenWidth / numColumns - 20,
    top: 130,
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the color and opacity
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5, // Augmentez l'opacité de l'ombre portée
    shadowRadius: 6,
    elevation: 19, 
  
  },
  textOnImage: {
    position: 'absolute',
    bottom: 10, // Adjust as needed
    left: 10, // Adjust as needed
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  
},
imageFooter: {
  width: screenWidth / numColumns - 20,
  height: screenWidth / numColumns - 10,
  borderRadius: 10,
  margin:10,

},

});

