import { Ionicons } from '@expo/vector-icons'
import { Text, Touchable, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

export default function Header({title, color, goBack=false, search=false}: { title: string, color: string, goBack?: boolean, search?: boolean,}) {
  const router = useRouter()
  return(
    <View style={styles.container}>
    <View style={{width: 30}}>
    {goBack && (
         <TouchableOpacity onPress={()=>router.back()}>
             <Ionicons name='arrow-back' size={30} color={color}/>
         </TouchableOpacity>
    )} 
    </View>
      <Text style={{color: `${color}`, fontSize: 22, fontWeight: 'bold'}}>{title}</Text>
      <View style={{width: 30}}>
      <TouchableOpacity onPress={()=>router.push('/search')}>
        <Ionicons name='search' size={30} color={color}/>
      </TouchableOpacity>
      </View>
      
    </View>
  )
}


const styles = StyleSheet.create({
 container: {
  position: 'absolute',
  zIndex: 99,
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  top: 10,
  marginTop: 10,
  padding: 15,
 },
});