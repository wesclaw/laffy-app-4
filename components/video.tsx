import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { ResizeMode, Video } from 'expo-av';
import React from 'react'


export default function({ video }: { video: any }) {
  const videoRef = React.useRef<Video>(null)

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
          //  onPlaybackStatusUpdate={status => setStatus(() => status)}
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
