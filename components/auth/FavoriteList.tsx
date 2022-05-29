import config from "../../config/config.json";
import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet, Pressable } from 'react-native';
import { Base, Typography } from '../../styles/index.js';
// import destination from '../assets/destination.png';
// import delayModel from '../models/delays.ts';

export default function DelayList({delays, setDelays, position}): Object {


    return (
        <ScrollView style={Base.mapText}>
            <Text style={Base.infoTitle}>Favorites</Text>


        </ScrollView>
    )
}
