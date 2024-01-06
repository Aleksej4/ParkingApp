import { View } from "react-native"
import QRCode from "react-native-qrcode-svg"
import { screenStyles } from "../styles/screenStyles"

export const QRScreen = ({route}) => {
    const { QRData } = route.params
    return(
        <View style={screenStyles.centerScreen}>
            <QRCode
            value={QRData}
            size={350}
            />
        </View>
    )
}