import { View, Alert } from "react-native"
import { useState, useContext } from "react"
import { screenStyles } from "../styles/screenStyles"
import { TextDataInputComponent } from "../components/TextDataInputComponent"
import { ButtonComponent } from "../components/ButtonComponent"
import { uploadUserParking } from "../firebase/uploadUserParking"
import { DataContext } from "../data_context/DataContext"

export const CreateParkingScreen = ({navigation}) => {
    const [location, setLocation] = useState("")
    const [price, setPrice] = useState("")
    const { userId } = useContext(DataContext)

    const addParking = async () => {
        if (location.trim() === "" || price.trim() === "") {
            Alert.alert("Data cannot be empty");
            return;
        }

        const parkingData = {
            IsActive: false,
            IsBeingUsed: false,
            Location: location,
            Price: parseInt(price),
            QRCodeData: ""
        }

        try {
            await uploadUserParking(userId, parkingData)
            navigation.goBack()
        } catch (error) {
            console.error('Error adding parking:', error);
        }
    }

    return(
        <View style={screenStyles.centerScreen}>
            <TextDataInputComponent iconName={"map-marker"} value={location} onChange={setLocation} placeholder={"Parking location"} keyboardType="default"/>
            <TextDataInputComponent iconName={"money"} value={price} onChange={setPrice} placeholder={"Parking Price (cents)"} keyboardType="numeric"/>
            <ButtonComponent text="Create" onPress={addParking}/>
        </View>
    )
}