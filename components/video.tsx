import { StyleSheet, FlatList, Dimensions, View, Text} from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import React from 'react'

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
    
    <View>
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

         <View style={styles.titleContainer}>
          <Text style={styles.userName}>{video.User.username}</Text>
          <Text style={styles.titleText}>The man who could not be tamed</Text>
         </View>
    </View>
        
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
  },
  titleContainer:{
    position: 'absolute',
    bottom: 40,
    left: 0,
    padding: 40
  },
  userName:{
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  titleText:{
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 30
  }
});
