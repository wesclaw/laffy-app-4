import { StyleSheet, TextInput, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router'
import React from 'react'
import { useFonts } from 'expo-font'

export default function HomeScreen() {

  const [loaded] = useFonts({
    logo: require('../../assets/fonts/logo-font.ttf'),
  })

  if(!loaded) {
    return null
  }

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleLogin = () =>{
    console.log(email, password)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logoName}>Sign up</Text>

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

      <Link style={styles.link} href="/(tabs)">Sign Up</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'ghostwhite',
    backgroundColor: 'rgb(226, 238, 255)',
  },
  link:{
    color: 'white',
    fontSize: 30,
    backgroundColor: 'rgb(241, 63, 63)',
    padding: 10,
    borderRadius: 50,
    width: '90%', 
    textAlign: 'center',
    marginVertical: 10, 
    
  },
  input:{
    color: 'black',
    fontSize: 20, 
    borderWidth: 1, 
    borderColor: '#cccccc', 
    backgroundColor: '#f9f9f9',
    padding: 10,
    paddingLeft: 30,
    borderRadius: 50,
    marginVertical: 10, 
    width: '90%', 
    alignSelf: 'center', 
  },
  logoName:{
    fontSize: 75,
    color: 'black',
    fontFamily: 'logo'
  },
});
