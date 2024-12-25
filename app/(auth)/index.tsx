import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      
      <Link style={styles.link} href="/(tabs)">Sign Up</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  link:{
    color: 'white',
    fontSize: 30,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
});
