import { Text, View } from 'react-native'
import { useAuth } from '@/providers/AuthProvider'

export default function(){
  const { user } = useAuth()
  return(
    <View>
      <Text>This is the comments sections</Text>
    </View>
  )
}