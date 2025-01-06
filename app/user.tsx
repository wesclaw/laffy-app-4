import { Text, View, StyleSheet } from 'react-native'
import { useAuth } from '@/providers/AuthProvider'
import { useLocalSearchParams } from 'expo-router'
import Header from '@/components/header'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function(){
  const pathName = useLocalSearchParams()
  
  return(
    <SafeAreaView>
      <Header title="Username" color="black" goBack/>
      <Text style={{fontWeight: 'bold', fontSize: 22, textAlign: 'center', marginTop: 50}}>Profile here</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  
})
