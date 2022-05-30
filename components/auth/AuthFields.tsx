import { View, Text, TextInput, Button, Pressable } from "react-native";
import { Typography, Forms, Base } from '../../styles';

export default function AuthFields({ auth, setAuth, title, submit, navigation }) {
    return (
        <View style={Base.loginField}>
        <Text style={Base.loginTitle}>{title}</Text>

            <Text style={Forms.inputLabel}>E-mail</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setAuth({...auth, email: content})
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={Forms.inputLabel}>Password</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setAuth({...auth, password: content})
                }}
                value={auth?.password}
                secureTextEntry={true}
            />
            <Pressable
                title={title}
                onPress={() => {
                    submit();
                }}
                style={Base.login}
            >
            <Text style={Base.button_text}>{title}</Text>
            </Pressable>
            {title === "Log in" &&
                <Pressable
                title="Register account"
                onPress={() => {
                    navigation.navigate("Register");
                }}
                style={Base.register}
                >
                <Text style={Base.button_text}>Register</Text>
                </Pressable>
            }
        </View>
    );
};
