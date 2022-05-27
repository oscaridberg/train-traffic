import config from "../config/config.json";
import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet, StatusBar } from 'react-native';
import { Base, Typography } from '../styles/index.js';
import MapView, { Marker } from 'react-native-maps';
import getCoordinates from '../models/nominatim.ts';
import * as Location from 'expo-location';
import delayModel from '../models/delays.ts';
import DelayList from './DelayList.tsx';

export default function Map({delays, setDelays, position, setPosition}):Object {
    const [isPress, setisPress] = useState(false);
    const [marker, setMarker] = useState([]);
    const [locationMarker, setLocationMarker] = useState(null);


    useEffect(() => {
        const fetchPosition = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            const userCoordinates = {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            };

            setPosition(userCoordinates);
            const data = await delayModel.matchDelays2Stations(userCoordinates);
            setDelays(data);

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="My location"
                pinColor="blue"
            />);
        };

        fetchPosition();

    }, []);

    useEffect(() => {
        if (delays[0]) {
            const markers = [];
            for (let i = 0; i < 10; i++) {
                markers.push(
                    {
                    name: delays[i].name,
                    expected: delays[i].expected,
                    latitude: parseFloat(delays[i].location[1]),
                    longitude: parseFloat(delays[i].location[0])
                })
            }
            setMarker(markers);
        }

    }, [delays]);

    delayModel.sortClosestStations(delays);

    return (
        <View style={Base.container}>
        <StatusBar barStyle = "light-content" hidden = {false} translucent = {true}/>

            <MapView
                userInterfaceStyle={'dark'}
                style={isPress? styles.mapFull : styles.map}
                initialRegion={{
                    latitude: position? position.latitude : 0,
                    longitude: position?  position.longitude : 0,
                    latitudeDelta: 4,
                    longitudeDelta: 4,
                }}
                onPress={() => isPress? setisPress(false) : setisPress(true)}
                >
                {marker.map((m, index) => (
                    <Marker
                        coordinate={{
                            latitude: m.latitude,
                            longitude: m.longitude
                        }}
                        title={m.name}
                        description={m.expected}
                        key={index}
                    />
                ))}
                {locationMarker}
            </MapView>

            <View style={isPress? Base.delayViewHidden : Base.delayView}>
                <DelayList delays={delays.slice(0,9)} setDelays={setDelays} position={position}/>
            </View>
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
