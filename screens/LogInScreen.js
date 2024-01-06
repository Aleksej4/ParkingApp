import React, { useState, useContext } from "react"
import { View, Text } from "react-native";
import { TextInputComponent } from "../components/TextInputComponent";
import { screenStyles } from "../styles/screenStyles";
import { ButtonComponent } from "../components/ButtonComponent";
import { FIREBASE_AUTH } from "../firebase/firebase";
import { DataContext } from "../data_context/DataContext";
import { signInWithEmailAndPassword } from "firebase/auth";

export const LogInScreen = ({navigation}) => {
    const { setUserIdData } = useContext(DataContext);

    const [email, setEmailValue] = useState('');
    const [password, setPasswordValue] = useState('')

    const handlePasswordInputChange = (text) => {
        setPasswordValue(text)
    }

    const handleEmailInputChange = (text) => {
      setEmailValue(text);
    };

    const handleLogin = async () => {
        try{
            const userCredentials = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            const user = userCredentials.user;

            if (user){
                setUserIdData(user.uid)
                console.log('Logged in user: ', user)
                console.log('user ID: ', user.uid)
                navigation.navigate('ParkingsScreen')
            }

        } catch (error) {
            console.error('Login error: ', error.message)
        }
    }

    return(
        <View style={screenStyles.centerScreen}>
            <Text style={{fontSize: 24, margin: 30, fontWeight: 'bold'}}>Log In page</Text>
            <TextInputComponent placeholder={"Email"} onChange={handleEmailInputChange} value={email} secureTextEntry={false}/>
            <TextInputComponent placeholder={"Password"} onChange={handlePasswordInputChange} value={password} secureTextEntry={true}/>
            <ButtonComponent text={"Log In"} onPress={handleLogin}/>
            <ButtonComponent text={"Register"} onPress={() => {navigation.navigate('RegisterScreen')}}/>
        </View>
    );
}