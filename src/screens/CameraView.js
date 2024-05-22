import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, CameraRoll, Image, Modal, Alert, PanResponder ,} from 'react-native';
import { Camera } from 'expo-camera/legacy';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as MediaLibrary from 'expo-media-library';

const CameraView = ({imageName}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
  const [showNotification, setShowNotification] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [focus, setFocus] = useState({ x: 0.5, y: 0.5 });
  const cameraRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        setFocus({
          x: Math.max(0, Math.min(1, (dx / width) + focus.x)),
          y: Math.max(0, Math.min(1, (dy / height) + focus.y)),
        });
      },
      onPanResponderGrant: (_, gestureState) => {
        setFocus({
          x: Math.max(0, Math.min(1, (gestureState.x0 / width))),
          y: Math.max(0, Math.min(1, (gestureState.y0 / height))),
        });
      },
    }).current
  );

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        setShowNotification(true);
      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        console.log('this is the firsttt')
        console.log(uri)
        await saveToCameraRoll(uri); // Save the captured image to the camera roll
        setSelectedImage(uri); // Set selectedImage to the captured image URI
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const saveToCameraRoll = async (uri) => {
    try {
      const filename = `${imageName}.jpg`;
      const localUri = FileSystem.documentDirectory + filename;
      await FileSystem.copyAsync({ from: uri, to: localUri });
      const asset = await MediaLibrary.createAssetAsync(localUri);
      const fetchedAlbum = await MediaLibrary.getAlbumAsync("Plants");
      /const album = await MediaLibrary.createAlbumAsync("Plants", asset, false);/
      await MediaLibrary.addAssetsToAlbumAsync(asset, fetchedAlbum.id , false);
      console.log('Image saved to Plants folder');
    } catch (error) {
      console.error('Error saving image to Plants folder:', error);
    }
  };
  const toggleCameraType = () => {
    setType((current) => (current === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back));
  };

  const handleZoomValueChange = (value) => {
    setZoom(value);
  };

  
  const handleSave = async () => {
    if (selectedImage) {
      console.log({selectedImage});
      try {
        const fileInfo = await FileSystem.getInfoAsync(selectedImage);
        console.log({fileInfo});

        const { uri } = fileInfo;
        console.log({uri});

        const response = await fetch(uri);
        console.log({response});

        const blob = await response.blob();
        console.log({blob});

        const filename = `image_${Date.now()}.jpg`;
        console.log({filename});

  
        console.log('Image uploaded and saved successfully:');
        setSelectedImage(null);
        setIsCameraOpen(true);
        Alert.alert('Success', 'The image has been saved successfully.');
      } catch (error) {
        console.error('Error uploading the image:', error);
        Alert.alert('Error', 'An error occurred while uploading the image.');
      }
    }
  };
  
  
  const handleDelete = () => {
    setSelectedImage(null);
    setIsCameraOpen(true);
  };
  {/*const uploadPhoto = () => {
    let storageRef = Storage.storage().references();
    let imageData = selectedImage!.jpejData(CompressionQuality: 0.8) 
    guard ImageData != nil  else {
        return
        }
        let fileref = storageRef.child("images/\(UUID().uuidString).jpg")
        let uploadTask = fileRef.putData(imageData! ,metadata:nil){
         metadata, error in 
         if error == nil && metadata != nil {
            print("File Uploaded Successfully")
        }
    
  };*/}
  return (
    <View style={styles.container}>
      <Modal visible={showNotification} transparent>
        <View style={styles.notificationContainer}>
          <View style={styles.notificationContent}>
            <Icon name="exclamation-circle" size={50} color="#FFA500" />
            <Text style={styles.notificationTitle}>Autorisation de la caméra requise</Text>
            <Text style={styles.notificationMessage}>Cette application a besoin d'accéder à votre caméra pour prendre des photos.</Text>
            <TouchableOpacity style={styles.notificationButton} onPress={() => setShowNotification(false)}>
              <Text style={styles.notificationButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.iconBar}>
        <TouchableOpacity style={styles.icon} onPress={() => setIsCameraOpen(true)}>
          <Icon name="camera" size={30} color="#000" />
          <Text style={styles.iconText}>Prendre une photo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {selectedImage ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleSave}>
                <Icon name="check" size={24} color="green" />


              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete}>
                <Icon name="trash" size={24} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedImage(null)}>
                <Icon name="undo" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Modal visible={isCameraOpen} animationType="slide">
            <Camera
              style={styles.camera}
              type={type}
              ref={cameraRef}
              zoom={zoom}
              autoFocus="on"
              {...panResponder.panHandlers}
            >
              <View style={styles.cameraControls}>
                <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
                  <Icon name="camera" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraType}>
                  <Icon name="exchange" size={24} color="white" />
                </TouchableOpacity>
                <Slider
                  style={styles.zoomSlider}
                  minimumValue={0}
                  maximumValue={1}
                  value={zoom}
                  onValueChange={handleZoomValueChange}
                />
              </View>
            </Camera>
          </Modal>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  iconBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  icon: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  iconContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 20,
    left: 20,
    right: 20,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cameraButton: {
    padding: 10,
  },
  zoomSlider: {
    flex: 1,
    marginLeft: 20,
  },
  notificationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  notificationContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  notificationMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  notificationButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFA500',
    borderRadius: 5,
  },
  notificationButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CameraView;