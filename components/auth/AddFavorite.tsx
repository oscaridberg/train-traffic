import { useState, useEffect } from 'react';
import { Platform, Text, View, Pressable, Alert, ScrollView } from 'react-native';
import delayModel from '../../models/delays.ts';
import { showMessage } from "react-native-flash-message";
import {SafeAreaView} from 'react-native-safe-area-context';
import { Base, Typography, Forms } from '../../styles';
import Moment from 'react-moment';
import { Picker } from '@react-native-picker/picker';




export default function AddFavorite() {
    // const [stations, setStations] = useState([]);
    const [currentStation, setCurrentStation] = useState<Partial<Product>>({});


    return (
        <SafeAreaView style={Base.loginField}>
            <Text style={Base.loginTitle}>Add Favorite</Text>
            <StationDropDown
                style={Forms.input}
                setCurrentStation={setCurrentStation}
            />



        </SafeAreaView>
    );
};

function StationDropDown(props) {
    const [stations, setStations] = useState<Product[]>([]);
    let stationsHash: any = {};

    useEffect(() => {
        async function stations () {
            setStations(await delayModel.getStations());
        }

        stations();
    }, []);

    console.log(stations);

    const itemList = stations.map((stations, index) => {
        stationsHash[stations.LocationSignature] = stations;
        return <Picker.Item key={index} label={stations.AdvertisedLocationName} value={stations.LocationSignature} />;
    });

    return (
        <Picker
            style={Forms.input}
            selectedValue={props.LocationSignature}
            onValueChange={(itemValue) => {
                props.setCurrentStation(stationsHash[itemValue]);
            }}
            >

            {itemList}
            </Picker>
    );
}
            // onValueChange={(itemValue) => {
            //     props.setCurrentStation(stationsHash[itemValue]);
            // }}>
