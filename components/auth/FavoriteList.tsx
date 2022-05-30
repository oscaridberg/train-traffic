import config from "../../config/config.json";
import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet, Pressable } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Base, Typography } from '../../styles/index.js';
// import destination from '../assets/destination.png';
// import delayModel from '../models/delays.ts';
import storage from "../../models/storage.ts";

export default function FavoriteList({delays, setDelays, position, navigation}): Object {
    const [favorites, setFavorites] = useState([]);
    const [title, setTitle] = useState([]);

    useEffect(() => {

        const getFavorites = async () => {
            const favoriteList = await storage.getFavorites();

            if (favoriteList !== null) {
                setFavorites(favoriteList);
                setTitle('Favorites')
            } else {
                setFavorites([]);
                setTitle('You have no favorites yet')
            }
        }

    getFavorites();
    }, [])



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
        </SafeAreaView>
    )
}
