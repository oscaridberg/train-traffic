import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import keyboard from '../assets/keyboard.jpg';
import Map from './Map.tsx';
import { useState, useEffect } from 'react';
import { Base, Typography } from '../styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllDelays from './AllDelays.tsx';

const Stack = createNativeStackNavigator();


export default function Delays({delays, setDelays, position}){
    return (
        <Stack.Navigator initialRouteName="All Delays" screenOptions={() => ({headerShown: false})}>
            <Stack.Screen name="Delays">
                {() => <AllDelays delays={delays} setDelays={setDelays} position={position}/>}
            </Stack.Screen>
        </Stack.Navigator>
        );
}
