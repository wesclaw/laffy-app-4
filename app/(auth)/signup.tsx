import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>signup auth</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    color: 'white'
  },
  title:{
    color: 'white',
  }
});
