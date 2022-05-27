import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';

import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Base, Typography } from './styles/index.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home.tsx';
import Delays from './components/Delays.tsx';


const Tab = createBottomTabNavigator();
const routeIcons = {
  "Near you":      "map",
  "All delays":     "time",
};

export default function App() {
    const [delays, setDelays] = useState([]);
    const [position, setPosition] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);


  return (
    <View style={Base.base}>
      <NavigationContainer>

              <Tab.Navigator style={Base.nav} screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName = routeIcons[route.name] || "alert";
                    return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#81be7c',
              tabBarInactiveTintColor: 'white',
              headerShown: false,
              tabBarStyle: {backgroundColor: '#252525', height: 75, paddingBottom: 10}
            })}
          >

            <Tab.Screen name="Near you" >
                {() => <Home delays={delays} setDelays={setDelays} position={position} setPosition={setPosition}/>}
            </Tab.Screen>

            <Tab.Screen name="All delays" >
                {() => <Delays delays={delays} setDelays={setDelays} position={position} />}
            </Tab.Screen>

            </Tab.Navigator>

      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}
