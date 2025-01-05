import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { ResizeMode, Video } from 'expo-av';
import React, { isValidElement } from 'react'

export default function({ video, isViewable }: { video: any, isViewable: boolean }) {
  const videoRef = React.useRef<Video>(null)

  React.useEffect(()=>{
    if(isViewable){
      videoRef.current?.playAsync()
    }else{
      videoRef.current?.pauseAsync()
    }
  },[isViewable])

  return (
    
         <Video
         ref={videoRef}
         style={{
          flex: 1, 
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
         }}
         source={{
           uri: video.signedUrl,
         }} 
         resizeMode={ResizeMode.COVER}
         isLooping
         />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    color: 'white',
  },
  title:{
    color: 'black',
    fontSize: 20
  }
});
