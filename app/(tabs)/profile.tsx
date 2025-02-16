import { StyleSheet, TouchableOpacity, Text, View, Image, SafeAreaView } from 'react-native';
import { useAuth } from '@/providers/AuthProvider'

export default function ProfileScreen() {

  const { user, signOut, following, followers } = useAuth()

  const addProfilePicture = async () => {
    // 
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={addProfilePicture}>
        <Image source={{uri: 'https://placehold.co/40x40'}} style={{width: 70, borderRadius: 50, backgroundColor: 'black', height: 70, marginBottom: 10}} />
      </TouchableOpacity>
     
        <Text style={styles.title}>{user?.username}</Text>
        <View style={{display: 'flex', flexDirection: 'row', gap: 50}}>
          <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{following.length}</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Following</Text>
          </View>
          
          <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{followers.length}</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Followers</Text>
          </View>
          
        </View>
        <TouchableOpacity>
        <Text style={styles.signOutBtn} onPress={signOut}>Sign out</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    color: 'white'
  },
  title:{
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  signOutBtn:{
    color: 'white',
    backgroundColor: 'black',
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
    margin: 'auto'
  }
});
