import { Text, View } from 'react-native'
import { useAuth } from '@/providers/AuthProvider'
import { useLocalSearchParams } from 'expo-router'

export default function(){
  const pathName = useLocalSearchParams()
  console.log(pathName)
  return(
    <View>
      <Text>the user who u clicked on. check out their other videos</Text>
      <Text>username here</Text>
    </View>
  )
}