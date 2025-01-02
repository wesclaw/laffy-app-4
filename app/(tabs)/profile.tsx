import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/providers/AuthProvider'

export default function ProfileScreen() {

  const { user, signOut } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>profile: {user?.username}</Text>
      <TouchableOpacity onPress={signOut}>
        <Text style={styles.signOutBtn}>Sign out</Text>
      </TouchableOpacity>
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
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 20
  },
  signOutBtn:{
    color: 'white',
    backgroundColor: 'black',
    fontSize: 20,
    padding: 10,
    
  }
});
