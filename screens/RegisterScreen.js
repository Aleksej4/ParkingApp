import { useContext, useState } from "react"
import { View, Text, Alert } from "react-native"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { DataContext } from "../data_context/DataContext";
import { FIREBASE_AUTH } from "../firebase/firebase";
import { screenStyles } from "../styles/screenStyles";
import { TextInputComponent } from "../components/TextInputComponent";
import { ButtonComponent } from "../components/ButtonComponent";

 export const RegisterScreen = ({navigation}) => {
    const { setUserIdData } = useContext(DataContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailInputChange = (text) => {
        setEmail(text)
    }

    const handlePasswordInputChange = (text) => {
        setPassword(text)
    }

    const handleRegister = async () => {
        if(email.trim() === "" || password.trim() === ""){
            Alert.alert("Please fill the registration data")
            return
        }

        try{
            const userCredentials = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            const user = userCredentials.user;

            if(user){
                setUserIdData(user.uid)
                navigation.navigate('ActiveParkingsScreen')
            }
        } catch (error) {
            console.error('Registration error: ', error.message)
        }
    }

    return(
        <View style={screenStyles.centerScreen}>
            <Text style={{fontSize: 24, margin: 30, fontWeight: 'bold'}}>Register page</Text>
            <TextInputComponent placeholder={"Email"} onChange={handleEmailInputChange} value={email} secureTextEntry={false}/>
            <TextInputComponent placeholder={"Password"} onChange={handlePasswordInputChange} value={password} secureTextEntry={true}/>
            <ButtonComponent text={"Register"} onPress={handleRegister}/>
            <ButtonComponent text={"Back"} onPress={() => {navigation.goBack()}}/>
        </View>
    )
 }