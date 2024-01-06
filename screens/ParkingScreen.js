import { TouchableHighlight, View, Text, Alert } from "react-native"
import { useEffect, useState, useContext } from "react"
import { screenStyles } from "../styles/screenStyles"
import QRCode from "react-native-qrcode-svg"
import { ButtonComponent } from "../components/ButtonComponent"
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { DataContext } from "../data_context/DataContext"
import { FIRESTORE_DB } from "../firebase/firebase"

export const ParkingScreen = ({route, navigation}) => {
    const { parking } = route.params
    const QRData = parking.QRData

    const [IsActive, setActivity] = useState(parking.IsActive)
    const [text, setText] = useState("")
    const [color, setColor] = useState('red')
    const [icon, setIcon] = useState("times")

    const { userId } = useContext(DataContext)

    useEffect(() => {
        if(IsActive){
            setText("Disable")
            setColor('green');
            setIcon('check');
        } else {
            setText("Activate")
            setColor('red')
            setIcon('times');
        }
    }, [IsActive])

    const changeStatus = async () => {
        if(IsActive === true && parking.IsBeingUsed === true){
            Alert.alert("You can not disable parking while someone is using it")
            return
        }

        try{
            const inputString = QRData
            const regex = /UserId:(.*?)ParkingId:(.*)/;
            const matches = inputString.match(regex);

            if (matches && matches.length === 3) {
                const parkingId = matches[2];

                const userParkingsRef = doc(FIRESTORE_DB, 'users', userId, 'parkings', parkingId)

                const updateField = {
                    IsActive: !IsActive
                }

                await updateDoc(userParkingsRef, updateField)
                setActivity(!IsActive)
            } else {
                console.log("IDs not found in the string.");
            }
    
        } catch (error) {
            console.error('Error updating parking document: ', error);
            return null;
        }
    }

    const deleteParking = async () => {
        if(IsActive){
            Alert.alert("You can not delete parking while it is active")
            return
        }

        Alert.alert("Confirmation", "Are you sure you want to delete parking?",[
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Delete",
                onPress: async () => {
                    try{
                        const inputString = QRData
                        const regex = /UserId:(.*?)ParkingId:(.*)/;
                        const matches = inputString.match(regex);

                        if (matches && matches.length === 3) {
                            const parkingId = matches[2];
                        
                            const userParkingsRef = doc(FIRESTORE_DB, 'users', userId, 'parkings', parkingId)
                        
                            await deleteDoc(userParkingsRef)
                            navigation.goBack()
                        } else {
                            console.log("IDs not found in the string.");
                        }
                    } catch (error) {
                        console.error('Error deleting parking document: ', error);
                    }
                }
            }
        ])
    }
    
    return(
        <View style={screenStyles.topScreen}>
            <TouchableHighlight onPress={() => {navigation.navigate('QRScreen', {QRData: QRData})}}>
                <QRCode
                    size={200}
                    value={QRData}
                />
            </TouchableHighlight>
            <View style={{width: '100%', height: 100, flexDirection: 'row'}}>
                <View style={{width: '50%', height: 100, justifyContent: 'center', paddingStart: 10}}>
                    <ButtonComponent text={text} onPress={changeStatus}/>
                </View>
                <View style={{width: '50%', height: 100, justifyContent: 'center', alignItems: 'flex-end', paddingEnd: 20}}>
                    <View style={{borderRadius: 50, backgroundColor: color, height: 50, width: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFF'}}>
                        <Icon name={icon}size={25} color="#FFF"/>
                    </View>
                </View> 
            </View>
            <View style={{height: 300, width: '100%', justifyContent: 'center'}}>
                <Text style={{ marginStart: 15, fontSize:16, fontWeight: 'bold'}}>Parking location:</Text>
                <Text style={{ marginStart: 15, fontSize: 20, marginBottom: 25 }}>{parking.Location}</Text>
                <Text style={{ marginStart: 15, fontSize:16, fontWeight: 'bold'}}>Parking Price:</Text>
                <Text style={{ marginStart: 15, fontSize: 20, marginBottom: 25 }}>{parking.Price/100}€/1h</Text>
                <Text style={{ marginStart: 15, fontSize:16, fontWeight: 'bold'}}>Activity:</Text>
                {parking.IsBeingUsed ? (
                    <Text style={{ marginStart: 15, fontSize: 20}}>Currently parking is in use</Text>
                ):
                    <Text style={{ marginStart: 15, color: '#D2042D', fontSize: 20}}>Parking is empty, no one is using it</Text>
                }
            </View>
            <ButtonComponent text={"Delete"} onPress={() => deleteParking()}/>
        </View>
    )
}