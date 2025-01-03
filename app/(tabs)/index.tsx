import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/providers/AuthProvider'
import { supabase } from '@/utils/supabase'
import React from 'react'
import { ResizeMode, Video } from 'expo-av';


export default function() {
  const { user } = useAuth()

  const [videos, setVideos] = React.useState<any[]>([])
  const videoRef = React.useRef<Video>(null)

  React.useEffect(()=>{
    getVideos()
  },[])

  const getVideos = async () => {
    const { data, error } = await supabase
    .from('Video')
    .select('*, User(username)')
    .order('created_at', {ascending: false})
    console.log(data)
    getSignedUrls(data)
  }

  const getSignedUrls = async (videos: any[]) => {
    const { data, error } = await supabase
    .storage
    .from('videos')
    .createSignedUrls(videos.map((video)=> video.uri),60 *60*24*7)
    
    let videoUrls = videos?.map((item)=>{
      item.signedUrl = data?.find((signedUrl) => signedUrl.path === item.uri)?.signedUrl;
      return item
    })
    setVideos(videoUrls)
  }
  return (
    <View style={styles.container}>
    <FlatList data={videos} snapToInterval={Dimensions.get('window').height} snapToStart decelerationRate="fast" renderItem={({ item })=>
           <Video
           ref={videoRef}
           style={{
            flex: 1, 
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
           }}
           source={{
             uri: item.signedUrl,
           }} 
           resizeMode={ResizeMode.COVER}
           isLooping

          //  onPlaybackStatusUpdate={status => setStatus(() => status)}
         />}>

    </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    color: 'white'
  },
  title:{
    color: 'black',
    fontSize: 20
  }
});
