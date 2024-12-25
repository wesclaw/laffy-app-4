import React from 'react';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, Text } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// icons
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// 

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
          // tabBarIcon: () => <Ionicons name="home-outline" size={24} color="black" />

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
          <View style={{position: 'absolute'}}>
             <Ionicons name="add-circle" size={65} color="rgb(241, 63, 63);" />
          </View>
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
