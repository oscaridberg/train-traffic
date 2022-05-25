import config from "../config/config.json";
import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet } from 'react-native';
import { Base, Typography } from '../styles/index.js';
// import productModel from '../models/products.ts';
// import keyboard from '../assets/keyboard.jpg';
// import StockList from './StockList.tsx';
import MapView, { Marker } from 'react-native-maps';
import getCoordinates from '../models/nominatim.ts';
import * as Location from 'expo-location';
import delayModel from '../models/delays.ts';


export default function Map():Object {
    const [position, setPosition] = useState({});
    const [isPress, setisPress] = useState(false);
    const [delays, setDelays] = useState([]);


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


    useEffect(() => {
        (async () => {
            const data = await delayModel.matchDelays2Stations;
            setDelays(data);
        })();
    }, []);

    // console.log(delays);



    return (
        <View style={Base.container}>
            <MapView
                userInterfaceStyle={'dark'}
                style={isPress? styles.mapFull : styles.map}
                initialRegion={{
                    latitude: position? position.latitude : 0,
                    longitude: position?  position.longitude : 0,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                onPress={() => isPress? setisPress(false) : setisPress(true)}
                >
            </MapView>

            <ScrollView style={isPress? Base.mapTextHidden : Base.mapText}>
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

    mapFull: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: '6%',
        right: 0,
    }
});
