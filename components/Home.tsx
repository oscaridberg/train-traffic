import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import keyboard from '../assets/keyboard.jpg';
import Map from './Map.tsx';
import { useState, useEffect } from 'react';
// import StockList from './Stock.tsx';
import { Base, Typography } from '../styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function Home({delays, setDelays, position, setPosition}){

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={() => ({headerShown: false})}>
            <Stack.Screen name="Map">
                {() => <Map delays={delays} setDelays={setDelays} position={position} setPosition={setPosition}/>}
            </Stack.Screen>
        </Stack.Navigator>
        );
}
