import React from 'react'
import { StyleSheet, SafeAreaView, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import Header from '@/components/header';
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { supabase } from '@/utils/supabase';


export default function Searchscreen() {
  const [text, setText] = React.useState('')
  const [ results, setResults ] = React.useState([])

  const search = async () => {
    const { data, error } = await supabase.from('User').select('*').eq('username', text)
    setResults(data)
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
              <Ionicons name="arrow-forward-circle" size={55} color='black'/>
            </TouchableOpacity>
      </View>
    <FlatList 
    data={results}
    renderItem={({ item: user}) => 
    
     <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 8, marginTop: 10, paddingHorizontal: 10,}}>
    
     <Image source={{uri: 'https://placehold.co/40x40'}}
     style={{backgroundColor: 'black', height: 50, width: 50, borderRadius: 50}}
     />
     <View>
     <Text style={{fontWeight: 800, fontSize: 19}}>{user.username}</Text>
     </View>
    </View>
    }
    />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title:{
    color: 'black',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 70, 
  },
  textInput: {
    flex: 1, 
    height: 50, 
    paddingHorizontal: 10, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    backgroundColor: '#f9f9f9',
    fontSize: 22, 
  }
});

