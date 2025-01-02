import React from 'react'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false)
  const cameraRef = React.useRef<CameraView>(null)

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const recordVideo = async () => {
    if(isRecording) {
      setIsRecording(false)
      cameraRef.current?.stopRecording()
    }else{
      setIsRecording(true);
      const video = await cameraRef.current?.recordAsync()
      console.log(video?.uri)
    }
  }

  return (
    <View style={styles.container}>
      <CameraView mode='video' ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse-sharp" size={50} color="white" />
          </TouchableOpacity> 
          {isRecording ? (
            <TouchableOpacity style={styles.button} onPress={recordVideo}>
            <Ionicons name="pause-circle" size={100} color="red" />
            </TouchableOpacity> 
          ) : (
            <TouchableOpacity style={styles.button} onPress={recordVideo}>
            <Ionicons name="radio-button-on" size={100} color="red" />
            </TouchableOpacity> 
          )}
          
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse-sharp" size={50} color="white" />
          </TouchableOpacity> 
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  button: {
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});