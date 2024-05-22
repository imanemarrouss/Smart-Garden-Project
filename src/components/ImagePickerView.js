import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Importer le hook de navigation

const ImagePickerView = () => {
  const navigation = useNavigation(); // Utiliser le hook de navigation

  const [selectedImage, setSelectedImage] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
      setShowPicker(true);
      getImageSize(result.assets[0].uri);
    }
  };

  const getImageSize = async (uri) => {
    Image.getSize(uri, (width, height) => {
      setImageWidth(width);
      setImageHeight(height);
    });
  };

  const handleSave = async () => {
    // Passer l'image sélectionnée à l'écran précédent avant de revenir
    navigation.navigate('AddPlants', { selectedImage: selectedImage });
  };

  const deleteImage = () => {
    setSelectedImage(null);
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      {!showPicker ? (
        <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
          <Icon name="image" size={50} color="#FFF" />
          <Text style={styles.buttonText}>Sélectionner une image</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.imageContainer}>
          {selectedImage && (
            <Image
              style={[styles.image, { width: imageWidth, height: imageHeight }]}
              source={{ uri: selectedImage }}
              resizeMode="contain"
            />
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={deleteImage}>
              <Icon name="trash" size={30} color="#FFF" />
              <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Icon name="save" size={30} color="#FFF" />
              <Text style={styles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setShowPicker(false)}>
              <Icon name="arrow-left" size={30} color="#FFF" />
              <Text style={styles.buttonText}>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    marginLeft: 5,
  },
});

export default ImagePickerView;
