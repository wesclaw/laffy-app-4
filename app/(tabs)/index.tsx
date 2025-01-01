import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/providers/AuthProvider'

export default function HomeScreen() {
  const { user } = useAuth()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>video infinte scroll home feed</Text>
      <Text style={styles.title}>{JSON.stringify(user)}</Text>
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
