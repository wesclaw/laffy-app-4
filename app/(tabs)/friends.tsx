import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function FriendsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>friends</Text>
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
