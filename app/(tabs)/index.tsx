import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { View } from '@/components/Themed';
import { supabase } from '@/utils/supabase'
import React from 'react'
import VideoPlayer from '@/components/video'
import Header from '@/components/header'

export default function() {
  const [videos, setVideos] = React.useState<any[]>([])

  const [ activeIndex, setActiveIndex ] = React.useState<number | null>(null)

  React.useEffect(()=>{
    getVideos()
  },[])

  const getVideos = async () => {
    const { data, error } = await supabase
    .from('Video')
    .select('*, User(*)')
    .order('created_at', {ascending: false})
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
      <Header title="Trending" color="white" goBack={false}/>
    <FlatList 
    data={videos} 
    snapToInterval={Dimensions.get('window').height} 
    onViewableItemsChanged={e=>setActiveIndex(e.viewableItems[0].key)}
    
    snapToStart 
    decelerationRate="fast" 
    renderItem={({ item }) => <VideoPlayer video={item} isViewable={activeIndex===item.id} />}
    />
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



   //    <Video
        //    ref={videoRef}
        //    style={{
        //     flex: 1, 
        //     width: Dimensions.get('window').width,
        //     height: Dimensions.get('window').height,
        //    }}
        //    source={{
        //      uri: item.signedUrl,
        //    }} 
        //    resizeMode={ResizeMode.COVER}
        //    isLooping

        //   //  onPlaybackStatusUpdate={status => setStatus(() => status)}
        //  />} 