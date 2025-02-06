import { StyleSheet, FlatList, Dimensions, View, Text, TouchableOpacity, Share} from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router'
import { useAuth } from '../providers/AuthProvider'
import { supabase } from '@/utils/supabase';

export default function({ video, isViewable }: { video: any, isViewable: boolean }) {
  const { user } = useAuth()
  const videoRef = React.useRef<Video>(null)
  const router = useRouter()

  React.useEffect(()=>{
    if(isViewable){
      videoRef.current?.playAsync()
    }else{
      videoRef.current?.pauseAsync()
    }
  },[isViewable])


  const shareVideo = () => {
    Share.share({
      message: `Check out this video! ${video.title}`
    })
  }

  const likeVideo = async () => {
    const { data, error } = await supabase
    .from('Like')
    .insert({
      user_id: user?.id,
      video_id: video.id,

    })
    console.log('like')
  }

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

          <View style={styles.wrapperForBtns}>
            <View style={styles.iconsAndTextWrapper}>
              <View>
                <Text style={styles.userName}>{video.User.username}</Text>
                <Text style={styles.title}>The man who could not be tamed</Text>
              </View>

                
                <View>
                    <TouchableOpacity style={styles.icon}>
                      <Ionicons name="person" size={40} color='white' onPress={()=>router.push(`/user?user_id=${video.User.id}`)}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                    <FontAwesome name="share" size={40} color="white" onPress={shareVideo}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                      <Ionicons name="chatbubble-ellipses" size={40} color='white' onPress={()=>router.push(`/comments?video_id=${video.id}`)} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={likeVideo}>
                      <FontAwesome5 name="laugh-squint" size={40} color="white" />
                    </TouchableOpacity>
                  </View>
             

            </View>
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
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  },
  userName:{
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  wrapperForBtns:{
    position: 'absolute',
    bottom: 80,
    left: 0,
    padding: 5,
    width: '100%'
  },
  iconsAndTextWrapper:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-end',  
    padding: 10, 
  },
  touchIcons:{
    flexDirection: 'row', 
  },
  icon: {
    marginTop: 30,
  }
});
