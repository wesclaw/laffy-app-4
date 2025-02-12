import React from 'react'
import { StyleSheet, SafeAreaView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Header from '@/components/header';
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

export default function Searchscreen() {
  const [text, setText] = React.useState('')

  const search = () => {
    console.log(text)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Search" color="black" goBack/>
      <View style={styles.searchWrapper}>
           <TextInput 
            placeholder='Search'
            onChangeText={(i)=>setText(i)}
            value={text} 
            style={styles.textInput}
            placeholderTextColor="#888" 
            />
            <TouchableOpacity onPress={search}>
              <Ionicons name="arrow-forward-circle" size={45} color='black'/>
            </TouchableOpacity>
      </View>
       
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // backgroundColor: 'white',
    width: '50%'
  },
  title:{
    color: 'black',
  },
  textInput: {
    height: 40, 
    paddingHorizontal: 10, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    backgroundColor: '#f9f9f9',
    fontSize: 18, 
    width: 'auto',
  },
  searchWrapper: {
    // flex: 1
    
  }
});
