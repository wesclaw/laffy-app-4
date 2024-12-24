import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login page</Text>
      <Link style={styles.link} href="/(tabs)">skip button</Link>
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
  title:{
    color: 'black',
    fontSize: 30,
  },
  link:{
    color: 'blue'
  },
});
