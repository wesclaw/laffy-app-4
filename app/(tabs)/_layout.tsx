import React from 'react';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, Text } from 'react-native';
import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
// import { useRouter } from 'expo-router'


// 

import { useNavigation } from '@react-navigation/native';

// 

// icons
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  // const router = useRouter()

  const navigation = useNavigation();

  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
        tabBarStyle:{
          height: 55,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => <Ionicons name={!focused ? 'home-outline' : 'home-sharp'} size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({focused}) => <Ionicons name={!focused ? "people-outline" : 'people-sharp'} size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: '',
          tabBarIcon: () => 
          <View style={{position: 'absolute', width: 100, right: -45}}>
             <Ionicons name="add-circle" size={75} color="rgb(241, 63, 63);" />
          </View>
        }}
        listeners={{
          tabPress: (e) =>{
            e.preventDefault()
            navigation.navigate('camera');
           
          }
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({focused}) => <MaterialCommunityIcons name={!focused ? "message-reply-text-outline" : "message-reply-text"} size={24} color="black" />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({focused}) => <Ionicons name={!focused ? "person-outline" : 'person'} size={24} color="black" />
        }}
      />
      
    </Tabs>
  );
}
