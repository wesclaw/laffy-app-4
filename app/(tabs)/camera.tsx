import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>camera</Text>
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
  }
});
