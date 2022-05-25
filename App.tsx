import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Base, Typography } from './styles/index.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home.tsx';



const Tab = createBottomTabNavigator();
const routeIcons = {
  "Inventory":      "home",
  "Pick Order":     "list",
  "Deliveries":     "cube",
  "Login":          "key",
  "Invoices":       "copy",
  "Ship":           "map"
};

export default function App() {
  return (
    <View style={Base.base}>
      <NavigationContainer>

              <Tab.Navigator style={Base.nav} screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName = routeIcons[route.name] || "alert";
                    return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#81be7c',
              tabBarInactiveTintColor: 'white',
              headerShown: false,
              tabBarStyle: {backgroundColor: '#252525', height: 75, paddingBottom: 10}
            })}
          >

            <Tab.Screen name="Inventory" >
                {() => <Home/>}
            </Tab.Screen>

            </Tab.Navigator>

      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}
