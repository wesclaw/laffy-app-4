import {
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import React from 'react';
import { useFonts } from 'expo-font';
import { supabase } from '@/utils/supabase'
import { useAuth } from '@/providers/AuthProvider'


export default function HomeScreen() {

  // const [loaded] = useFonts({
  //   logo: require('../../assets/fonts/logo-font.ttf'),
  // })
  // if (!loaded) {
  //   return null; // Or return a loading indicator
  // }

  const router = useRouter();

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { signIn } = useAuth() 

  return (
    <View style={styles.container}>
      <Text style={styles.logoName}>Laffy</Text>

      <Text style={styles.underLogo}>Make Every Second Count</Text>

      <Text style={styles.title}>
        Login
      </Text>
      <TextInput 
      placeholder='Email'
      placeholderTextColor={Platform.OS === 'ios' ? '#888' : '#aaa'}
      style={styles.input}
      value={email}
      onChangeText={setEmail}
      />
      <TextInput 
      secureTextEntry={true}
      placeholder='Password'
      placeholderTextColor={Platform.OS === 'ios' ? '#888' : '#aaa'}
      style={styles.input}
      value={password}
      onChangeText={setPassword}
      />

    <TouchableOpacity 
    style={styles.touchOp}
    onPress={()=>signIn(email, password)}>
      <Text style={styles.link}>Login</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    style={styles.touchOp}
    onPress={()=>router.push('/signup')}>
    <Text style={styles.linkForSignUp}>Sign Up</Text>
    </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(226, 238, 255)',
  },
  touchOp:{
    width: '95%',
  },
  link:{
    color: 'white',
    fontSize: 22,
    backgroundColor: 'rgb(241, 63, 63)',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    marginVertical: 5, 
  },
  input:{
    color: 'black',
    fontSize: 22, 
    borderWidth: 1, 
    borderColor: '#cccccc', 
    backgroundColor: '#f9f9f9',
    padding: 10,
    paddingLeft: 20,
    borderRadius: 5,
    marginVertical: 5, 
    width: '95%', 
    alignSelf: 'center', 
  },
  logoName:{
    fontSize: 75,
    color: 'rgb(241, 63, 63)',
    fontFamily: 'logo',
    textDecorationLine: 'underline',
    width: '100%',
    textAlign: 'center',
  },
  title:{
    fontSize: 25,
    fontWeight: 600,
    color: 'black'
  },
  underLogo:{
    fontSize: 20,
    marginBottom: 40,
    color: 'black'
  },
  linkForSignUp:{
    fontSize: 22,
    marginTop: 10,
    textAlign: 'center',
    color: 'black'
  }
});
