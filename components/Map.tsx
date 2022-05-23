import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet } from 'react-native';
import { Base, Typography } from '../styles/index.js';
import productModel from '../models/products.ts';
import keyboard from '../assets/keyboard.jpg';
import StockList from './StockList.tsx';
import MapView, { Marker } from 'react-native-maps';
import getCoordinates from '../models/nominatim.ts';
import * as Location from 'expo-location';



export default function Map():Object {
    const [position, setPosition] = useState({});

    useEffect(() => {
    (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied');
            return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});

        setPosition(
            {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            }
        );
    })();
    }, []);

    return (
        <View style={Base.container}>
            <MapView
                userInterfaceStyle={'dark'}
                style={styles.map}
                initialRegion={{
                    latitude: position.latitude,
                    longitude: position.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}>
            </MapView>

            <ScrollView style={Base.mapText}>
                <Text style={Base.infoTitle}>Delays near you:</Text>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '50%',
        alignItems: "center",
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: '49%',
        right: 0,
    },
});
