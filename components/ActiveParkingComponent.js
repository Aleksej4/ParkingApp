import { View, Text, Alert } from "react-native"
import { activeParkingComponentStyles } from "../styles/activeParkingComponentStyles"
import { ButtonComponent } from "./ButtonComponent"
import { useContext } from "react"
import { DataContext } from "../data_context/DataContext"
import { updateParkingState } from "../firebase/updateParkingState"
import { deleteActiveParking } from "../firebase/deleteActiveParking"

export const ActiveParkingComponent = ({parking, onActionTrigger}) => {
    const { userId } = useContext(DataContext)

    const DateTimeExtractor = () => {
        const dateTimeString = parking.StartDate;

        const dateTime = new Date(dateTimeString);

        const year = dateTime.getFullYear();
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const day = dateTime.getDate().toString().padStart(2, '0');

        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        const date = `${year}-${month}-${day}`;
        const time = `${formattedHours}:${formattedMinutes}`;

        return date + " " + time
    }

    const handleCancelParking = () => {
        const startDate = new Date(parking.StartDate);
        const currentDate = new Date(); 

        const timeDifferenceMs = currentDate.getTime() - startDate.getTime();

        const timeDifferenceMinutes = Math.floor(timeDifferenceMs / (1000 * 60));

        const price = (timeDifferenceMinutes * (parking.Price/60))/100
        const formattedPrice = price.toFixed(2)

        Alert.alert("Confirmation", "You will have to pay " + formattedPrice + "€", [
            {
                text: "Cancel",
                style: 'cancel'
            },
            {
                text: "Proceed",
                onPress: async () => {
                    try{
                        const state = await updateParkingState(parking.QRCodeData, true)
                        if (state){
                            await deleteActiveParking(parking.QRCodeData, userId)
                            onActionTrigger()
                        }
                    } catch (error){
                        console.error('Error deleting active parking: ', error);
                    }
                }
            }
        ])
    }

    return(
        <View style={activeParkingComponentStyles.mainContainer}>
            <View style={activeParkingComponentStyles.containerTitle}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{parking.Location}</Text>
            </View>
            <View style={activeParkingComponentStyles.contentContainer}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>Price: </Text>
                    <Text style={{fontSize: 15, marginBottom: 10}}>{parking.Price/100}€/1h</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>Start date: </Text>
                    <Text style={{fontSize: 15}}>{DateTimeExtractor()}</Text>
                </View>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <ButtonComponent text={"Cancel"} onPress={() => {handleCancelParking()}}/>
            </View>
        </View>
    )
}