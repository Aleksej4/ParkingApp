import { useContext, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"
import { screenStyles } from "../styles/screenStyles"
import { fetchParking } from "../firebase/fetchParking"
import { ButtonComponent } from "../components/ButtonComponent"
import { updateParkingState } from "../firebase/updateParkingState"
import { uploadActiveParking } from "../firebase/uploadActiveParking"
import { DataContext } from "../data_context/DataContext"

export const QRCodeScannerScreen = ({navigation}) => {
    const [scanned, setScanned] = useState(false)
    const [parkingData, setParkingData] = useState({})
    const { userId } = useContext(DataContext)

    const handleQRCodeScanned = async ({data}) => {
        if(!scanned) {
            setScanned(true)
            console.log(data)
            const fetchedData = await fetchParking(data)
            setParkingData(fetchedData)
        }
    }

    const getCurrentTimeInFormat = () => {
        const currentDate = new Date();
        const currentTimeString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}T${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
        return currentTimeString;
    }

    const updateParkingStateData = async () => {
        const state = await updateParkingState(parkingData.QRCodeData, parkingData.IsBeingUsed)

        if(state){
            const activeParkingData = {
                Location: parkingData.Location,
                Price: parkingData.Price,
                StartDate: getCurrentTimeInFormat()
            }

            await uploadActiveParking(userId, activeParkingData, parkingData.QRCodeData)
        }

        navigation.goBack()
    }

    return(
        <View style={screenStyles.centerScreen}>
            {!scanned ? (
                <BarCodeScanner
                style={StyleSheet.absoluteFillObject}
                onBarCodeScanned={scanned ? undefined : handleQRCodeScanned}
                />
            ): 
                <View style={{...screenStyles.topScreen, width:'100%'}}>
                    <View style={{width: '100%', height: 100, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 30,
                            fontWeight: 'bold'
                        }}>Parking information</Text>
                    </View>

                    <View style={{padding: 25, height: 500, width: '100%'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Parking location:</Text>
                        <Text style={{fontSize: 20, paddingBottom: 15}}>{parkingData.Location}</Text>

                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Parking price:</Text>
                        <Text style={{fontSize: 20, paddingBottom: 15}}>{parkingData.Price/100}€/1h</Text>

                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Parking activity:</Text>
                        {parkingData.IsActive ? (
                            <View>
                                <Text style={{fontSize: 20, paddingBottom: 15}}>Parking currently is enabled</Text>

                                <Text style={{fontWeight: 'bold', fontSize: 16}}>Parking usage:</Text>
                                {parkingData.IsBeingUsed ?(
                                    <Text style={{color: 'red', fontSize: 20, paddingBottom: 15}}>Parking curently is being in use</Text>
                                ):
                                    <Text style={{fontSize: 20, paddingBottom: 15}}>Parking is empty</Text>
                                }
                            </View>
                        ):
                            <Text style={{color: 'red', fontSize: 20, paddingBottom: 15}}>Parking currently is disabled</Text>
                        }
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        {parkingData.IsActive && !parkingData.IsBeingUsed ? (
                            <ButtonComponent text={"Start"} onPress={updateParkingStateData}/>
                        ): null}
                        <ButtonComponent text={"Cancel"} onPress={() => {navigation.goBack()}}/>
                    </View>
                </View>
            }
        </View>
    )
}