import { Image, StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Base, Typography } from '../../styles';
import FavoriteList from './FavoriteList.tsx';
import AddFavorite from './AddFavorite.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Favorites ({delays, setDelays}): object {
    StatusBar.setBarStyle('light-content', true)

    return (
        <Stack.Navigator initialRouteName="FavoriteNavigator" screenOptions={() => ({headerShown: false})}>
            <Stack.Screen name="FavoriteList" >
                {(screenProps) => <FavoriteList {...screenProps} delays={delays} setDelays={setDelays} />}
            </Stack.Screen>

            <Stack.Screen name="AddFavorite">
                {() => <AddFavorite />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}
        // <SafeAreaView style={Base.safeArea}>
        //     <FavoriteList delays={delays} setDelays={setDelays}/>
        // </SafeAreaView>
