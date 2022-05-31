import { useState, useEffect } from 'react';
import { Platform, Text, View, Pressable, Alert, ScrollView } from 'react-native';
import delayModel from '../../models/delays.ts';
import { showMessage } from "react-native-flash-message";
import {SafeAreaView} from 'react-native-safe-area-context';
import { Base, Typography, Forms } from '../../styles';
import Moment from 'react-moment';
import { Picker } from '@react-native-picker/picker';
import storage from "../../models/storage.ts";




export default function AddFavorite({navigation}) {
    // const [stations, setStations] = useState([]);
    const [currentStation, setCurrentStation] = useState<Partial<Station>>({});
    const [favorite, setFavorite] = useState<Partial<Favorite>>({});


    async function addFavorite() {

        const stations = await delayModel.getStation(favorite);
        let station = {};

        for (const item of stations) {
            if (item.LocationSignature === favorite.station_id) {
                station = {
                    name: item.AdvertisedLocationName,
                    id: item.LocationSignature
                }
            }
        }

        const result = await storage.storeFavorites(station);

        showMessage({
            message: result.message,
            description: result.description,
            type: result.type
        });

        navigation.navigate('FavoriteList', {reload: true});
    }
    return (
        <SafeAreaView style={Base.loginField}>
            <Text style={Base.loginTitle}>Add Favorite</Text>
            <StationDropDown
                style={Forms.input}
                favorite={favorite}
                setFavorite={setFavorite}
                setCurrentStation={setCurrentStation}
            />

            <Pressable
                title="Add Favorite"
                onPress={() => {
                    addFavorite();
                }}
                style={Base.favoritesButton}
            >
            <Text style={Base.button_text}>Add Favorite</Text>
            </Pressable>


        </SafeAreaView>
    );
};

function StationDropDown(props) {
    const [stations, setStations] = useState<Station[]>([]);
    let stationsHash: any = {};

    useEffect(() => {
        async function stations () {
            setStations(await delayModel.getStations());
        }

        stations();
    }, []);


    const itemList = stations.map((station, index) => {
        stationsHash[station.LocationSignature] = station;
        return <Picker.Item key={index} label={station.AdvertisedLocationName} value={station.LocationSignature} />;
    });

    return (
        <Picker
            style={Forms.input}
            selectedValue={props.favorite?.station_id}
            onValueChange={(itemValue) => {
                props.setFavorite({ ...props.favorite, station_id: itemValue });
                props.setCurrentStation(stationsHash[itemValue]);
            }}
            >

            {itemList}
            </Picker>
    );
}
