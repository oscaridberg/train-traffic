import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';
import Register from './Register';

const Stack = createNativeStackNavigator();

export default function Auth(props) {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={() => ({headerShown: false})}>
            <Stack.Screen name="Log in">
                {(screenProps) => <Login {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
}
            // <Stack.Screen name="CreateInvoice" component={CreateInvoice} />
