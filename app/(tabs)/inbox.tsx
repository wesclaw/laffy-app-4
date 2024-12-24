import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function InboxScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>inbox</Text>
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
