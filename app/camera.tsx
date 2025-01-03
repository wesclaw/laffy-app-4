import React from 'react'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from '@/utils/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import { ResizeMode, Video } from 'expo-av';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false)
  const cameraRef = React.useRef<CameraView>(null)
  const [videoUri, setVideoUri] = useState<string | null>(null)
  const { user } = useAuth()
  const router = useRouter()
  const videoRef = React.useRef<Video>(null); 
  const [status, setStatus] = useState({isLoaded: false, isPlaying: false})


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
      setVideoUri(video?.uri)
    }
  }

  const saveVideo = async () => {
    const formData = new FormData()
    const fileName = videoUri?.split('/').pop()
    formData.append('file', {
      uri: videoUri,
      type: `video/${fileName?.split('.').pop()}`,
      name: fileName,
    })

    const { data, error } = await supabase.storage
    .from('videos')
    .upload(fileName, formData, {
      cacheControl: '3600000000',
      upsert: false,
    })
    if(error) console.error(error)
    
    const { error: videoError } = await supabase.from('Video').insert({
      title: "test title here is is boys",
      uri: data?.path, 
      user_id: user?.id,
    })
    if(videoError) console.error(videoError)
    router.back()
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setVideoUri(result.assets[0].uri)
    console.log(result.assets[0].uri);
  };


  return (
  
    <View style={styles.container}>
      
         {videoUri ? (

          <View style={{flex: 1}}>
          
          <TouchableOpacity style={{position:'absolute', zIndex: 10, bottom: 20, left: 150,}} onPress={saveVideo}>
            <Ionicons name="checkmark-circle" size={100} color="green" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={5} style={styles.videoContainer}
          onPress={()=>status.isPlaying ? videoRef.current?.pauseAsync() : videoRef.current?.playAsync()}>
          
          <Video
           ref={videoRef}
           style={{
            flex: 1, 
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
           }}
           source={{
             uri: videoUri,
           }} 
           resizeMode={ResizeMode.COVER}
           isLooping
           onPlaybackStatusUpdate={status => setStatus(() => status)}
         />

          </TouchableOpacity>

          </View>
        )
        : 
        <CameraView mode="video" ref={cameraRef} style={styles.camera} facing={facing}>
         <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Ionicons name="aperture" size={50} color="white" />
          </TouchableOpacity>
        {videoUri ? (
          <TouchableOpacity style={styles.button} onPress={saveVideo}>
            <Ionicons name="checkmark-circle" size={100} color="green" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={recordVideo}>
            <Ionicons
              name={isRecording ? 'pause-circle' : 'radio-button-on'}
              size={100}
              color="red"
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Ionicons name="camera-reverse-sharp" size={50} color="white" />
        </TouchableOpacity>
        </View>
        </CameraView>
      }
     
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
  videoContainer:{
    flex: 1,
  }
});