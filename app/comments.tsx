import { Text, TextInput, Touchable, TouchableOpacity, View, FlatList, Image, SafeAreaView, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard  } from 'react-native'
import { useAuth } from '@/providers/AuthProvider'
import { useLocalSearchParams } from 'expo-router'
import {supabase} from '@/utils/supabase'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'


export default function(){
  const { user } = useAuth()
  const pathName = useLocalSearchParams()
  const [comments, setComments] = React.useState<any[]>([])
  const [text, setText] = React.useState<string>('')

  React.useEffect(()=>{
    getComments()
  },[])

  const getComments = async () => {
    const { data, error } = await supabase
    .from('Comment')
    .select('*, User(*)')
    .eq('video_id', pathName.video_id)
    if(error) return console.log(error)
    setComments(data)
  }

  const addComment = async () => {
    const { error } = await supabase.from('Comment').insert({
      user_id: user?.id,
      video_id: pathName.video_id,
      content: text
    })
    if(error) return console.log(error)
    setText('')
    Keyboard.dismiss()
    getComments()
  }
  
  return(
    <KeyboardAvoidingView style={{flex: 1}} 
    behavior={Platform.OS === 'ios' ?  'padding' : 'height'}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={{backgroundColor: 'white', flexDirection: 'column', justifyContent: 'center', padding: 10, flex: 1, alignItems: 'center'}}>
      <Text style={{fontWeight: 'bold', marginTop: 1, fontSize: 20}}>Comments</Text>
     <FlatList style={styles.commentContainer}
     data={comments}
     renderItem={({ item })=> {
      return(
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 8}}>
          <View>
          <Image source={{uri: 'https://placehold.co/40x40'}}
          style={{backgroundColor: 'black', height: 30, width: 30, borderRadius: 50}}
          />
          </View>
          <View>
          <Text style={{fontWeight: 800, fontSize: 14}}>{item.User.username}</Text>
          <Text>{item.content}</Text>
          </View>
        </View>
      )
     }}
     />
     <View style={styles.container}>
     <TextInput 
      placeholder='Add a comment'
      onChangeText={(i)=>setText(i)}
      value={text} 
      style={styles.textInput}
      placeholderTextColor="#888" 
      />
      <TouchableOpacity onPress={addComment}>
        <Ionicons name="arrow-forward-circle" size={45} color='black'/>
      </TouchableOpacity>
     </View>
      
    </SafeAreaView>

    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
    padding: 5
  },
  commentContainer:{
    width: '100%',
    padding: 5
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
    flex: 1
  },
});