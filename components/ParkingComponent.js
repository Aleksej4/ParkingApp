import { TouchableHighlight } from "react-native";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { parkingComponentStyles } from "../styles/parkingComponentStyles";
import Icon from 'react-native-vector-icons/FontAwesome';
import QRCode from "react-native-qrcode-svg";

export const ParkingComponent = ({refreshKey, parking, onPress}) => {
    const [color, setColor] = useState('red')
    const [icon, setIcon] = useState("times")
    const [text, setText] = useState("Disabled")

    useEffect(() => {
        setData()
    }, [refreshKey])

    const setData = () => {
        if(parking.IsActive){
            setColor('green');
            setIcon('check');
            setText('Enabled');
        } else {
            setColor('red');
            setIcon('times');
            setText('Disabled');
        }
    }

    return(
        <TouchableHighlight underlayColor="#C3D3ED" style={parkingComponentStyles.container} onPress={() => {onPress()}}>
            <View style={{flexDirection: 'row'}}>
                <View style={parkingComponentStyles.boxFrameContainer}>
                    <QRCode
                        value={parking.QRData}
                        size={85}
                        color="black"
                        backgroundColor="white"
                    />
                </View>
                <View style={parkingComponentStyles.infoFrameContainer}>
                    <View style={parkingComponentStyles.infoBoxContainer}>
                        <Text style={{margin: 5, fontSize: 15, marginTop: 16}}>Price: {parking.Price / 100}€/1h</Text>
                    </View>
                    <View style={parkingComponentStyles.infoBoxContainer}>
                        {parking.IsBeingUsed ? (
                            <Text style={{ margin: 5, fontSize: 15, marginBottom: 16 }}>Parking is in use</Text>
                        ): 
                            <Text style={{ margin: 5, color: '#D2042D', fontSize: 15, marginBottom: 16  }}>Parking is empty</Text>
                        }
                    </View>
                </View>
                <View style={parkingComponentStyles.boxFrameContainer}>
                    <Text style={{padding: 2}}>{text}</Text>
                    <View style={{borderRadius: 50, backgroundColor: color, height: 50, width: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFF'}}>
                        <Icon name={icon}size={25} color="#FFF"/>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
}