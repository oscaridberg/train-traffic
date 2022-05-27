import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import keyboard from '../assets/keyboard.jpg';
import Map from './Map.tsx';
import { useState, useEffect } from 'react';
// import StockList from './Stock.tsx';
import { Base, Typography } from '../styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SafeArea from './SafeArea.tsx';

const Stack = createNativeStackNavigator();


export default function AllDelays({delays, setDelays, position}){
    return (
        <Stack.Navigator initialRouteName="All Delays" screenOptions={() => ({headerShown: false})}>
            <Stack.Screen name="Delays">
                {() => <SafeArea delays={delays} setDelays={setDelays} position={position}/>}
            </Stack.Screen>
        </Stack.Navigator>
        );
}
