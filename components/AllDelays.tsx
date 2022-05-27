import { Image, StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Base, Typography } from '../styles';
import DelayList from './DelayList.tsx';

export default function SafeArea ({delays, setDelays}): object {
    StatusBar.setBarStyle('light-content', true)

    return (
        <SafeAreaView style={Base.safeArea}>
            <DelayList delays={delays} setDelays={setDelays}/>
        </SafeAreaView>
    )
}
