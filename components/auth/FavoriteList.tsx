import config from "../../config/config.json";
import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet, Pressable } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Base, Typography } from '../../styles/index.js';
// import destination from '../assets/destination.png';
import delayModel from '../../models/delays.ts';
import storage from "../../models/storage.ts";


export default function FavoriteList({delays, setDelays, position, navigation, route=false}): Object {
    const { reload } = route.params || false;
    const [favoritesName, setFavoritesName] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [title, setTitle] = useState([]);

    if (reload) {
        reloadFavorites();
    };

    async function reloadFavorites(): Void {
        const data = await storage.getFavorites();
        const result = JSON.parse(data);
        const favoriteList = await delayModel.matchDelay2Station(result.favorites);
        setFavoritesName(result.favorites);
        setFavorites(favoriteList);
    };

    useEffect(() => {

        const getFavorites = async () => {
            const data = await storage.getFavorites();

            if (data !== null) {
                const result = JSON.parse(data);
                const favoriteList = await delayModel.matchDelay2Station(result.favorites);
                setFavoritesName(result.favorites);
                setFavorites(favoriteList);
            } else {
                setFavorites([]);
                setTitle('You have no favorites yet')
            }
        }

    getFavorites();
    }, [])

    const list = favoriteList(favoritesName, favorites);


    return (
        <SafeAreaView style={Base.loginField}>
            <Text style={Base.loginTitle}>Favorites</Text>
            <Text style={Base.favoritesTitle}>{title}</Text>
            <Pressable
                title='Favorites'
                style={Base.favoritesButton}
                onPress={() => navigation.navigate('AddFavorite')}
            >
            <Text style={Base.button_text}>Add favorite</Text>
            </Pressable>
            <ScrollView style={Base.favoritesListContainer}>
            {list}
            </ScrollView>
        </SafeAreaView>
    )
}

function favoriteList(favoritesName:object, favorites) {
    let list = [];
    let matches = {};


    for (const item of favoritesName) {
        matches[item.id] = [];
        for (const favorite of favorites) {
            if (favorite.name === item.name) {
                matches[item.id].push(
                    <View key={favorite.trainID} style={Base.favoriteDetails}>
                        <View style={Base.timeTitle}>
                            <Text style={Base.favoriteTimeDelay}>{favorite.advertised}</Text>
                            <Text style={Base.favoriteTimeExpected}>{favorite.expected}</Text>
                        </View>
                        <Text style={Base.favoriteDestination}>{favorite.destination}</Text>
                        <Text style={Base.favoriteTrainId}>Train-ID: {favorite.trainID}</Text>

                    </View>
                )
            }
        }
        list.push(
            <View key={item.id} style={Base.favoriteCard}>
            <Text style={Base.favoriteCardTitle}>{item.name}</Text>
            {matches[item.id]}
            </View>)
    }

    return list
}
