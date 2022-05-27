import config from "../config/config.json";
import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet, Pressable } from 'react-native';
import { Base, Typography } from '../styles/index.js';
import destination from '../assets/destination.png';
import delayModel from '../models/delays.ts';

export default function DelayList({delays, setDelays, position}): Object {
    delays.sort((a, b) => (a.advertised > b.advertised) ? 1 : -1);

    let header;

    if (delays.length > 10) {
        header = "All delays"
    } else {
        header = "Delays near you"
    };

    return (
        <ScrollView style={Base.mapText}>
            <Text style={Base.infoTitle}>{header}</Text>

            {delays.map((d, index) => (
                <View key={index} style={Base.delayCard}>
                    <Image style={Base.delayImg} source={destination} />

                    <View style={Base.delayStation}>
                        <Text style={Base.cardText}>{d.name}</Text>
                        <Text style={Base.cardText}>{d.destination}</Text>
                    </View>

                    <View style={Base.delayTime}>
                        <Text style={Base.delayText}>Planned Arrival: {d.advertised}</Text>
                        <Text style={Base.newText}>New Arrival: {d.expected}</Text>
                    </View>
                </View>
            ))}

        </ScrollView>
    )
}
