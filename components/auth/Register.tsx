import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth.ts';
import AuthFields from './AuthFields';
import { showMessage } from "react-native-flash-message";
import {SafeAreaView} from 'react-native-safe-area-context';
import { Base, Typography } from '../../styles';

export default function Register({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>([]);

    async function doRegister() {
        if (auth.email && auth.password) {
            const result = await AuthModel.register(auth.email, auth.password);

            if (result.type === "success") {
                setIsLoggedIn(true);
            }
            
            showMessage({
                message: result.title,
                description: result.message,
                type: result.type,

            });


    } else {
        showMessage({
            message: "Missing",
            description: "Missing email or password",
            type: "warning",
        });
    }
};

    return (
        <SafeAreaView style={Base.safeArea}>
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Register"
            navigation={navigation}
        />
        </SafeAreaView>
    );
};
