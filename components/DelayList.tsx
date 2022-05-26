import config from "../config/config.json";
import { useState, useEffect } from 'react';
import { ScrollView, Image, Text, View, StyleSheet } from 'react-native';
import { Base, Typography } from '../styles/index.js';

export default function DelayList(list): Object {
    // console.log(list);
    const delays = list.delays.sort((a, b) => (a.advertised > b.advertised) ? 1 : -1);



    return (
        <ScrollView style={Base.mapText}>
            <Text style={Base.infoTitle}>Delays near you</Text>
            {delays.map((d, index) => (
                <View key={index} style={Base.delayCard}>
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
